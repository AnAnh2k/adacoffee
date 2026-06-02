import prisma from '../../lib/prisma';
import { UserPayload } from '../../middlewares/authenticate';
import { hashPassword, comparePassword } from '../../utils/password';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';
import jwt from 'jsonwebtoken';

const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ada_coffee_refresh_token_secret_key_67890';

export class AuthService {
  // Logic Đăng ký
  static async register(name: string, email: string, password: string) {
    // 1. Kiểm tra email tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      throw new Error('Email này đã được sử dụng. Vui lòng chọn email khác.');
    }

    // 2. Mã hóa mật khẩu
    const hashedPassword = await hashPassword(password);

    // 3. Lưu vào DB
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return newUser;
  }

  // Logic Đăng nhập
  static async login(email: string, password: string) {
    // 1. Tìm user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    // 2. Đối khớp mật khẩu
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác.');
    }

    const userPayload: UserPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    // 3. Tạo token
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    // 4. Lưu Refresh Token vào Database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt
      }
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.createdAt
      }
    };
  }

  // Logic Refresh Token
  static async refresh(token: string) {
    // 1. Kiểm tra token trong DB
    const dbToken = await prisma.refreshToken.findUnique({
      where: { token }
    });

    if (!dbToken || dbToken.expiresAt < new Date()) {
      throw new Error('Refresh Token đã hết hạn hoặc không hợp lệ.');
    }

    // 2. Xác thực signature JWT
    return new Promise<{ accessToken: string }>((resolve, reject) => {
      jwt.verify(token, REFRESH_SECRET, (err: any, decoded: any) => {
        if (err) {
          reject(new Error('Refresh Token đã hết hạn hoặc không hợp lệ.'));
          return;
        }

        const payload = decoded as UserPayload;
        const userPayload: UserPayload = {
          id: payload.id,
          email: payload.email,
          role: payload.role
        };

        const newAccessToken = generateAccessToken(userPayload);
        resolve({ accessToken: newAccessToken });
      });
    });
  }

  // Logic Đăng xuất
  static async logout(token: string) {
    if (token) {
      await prisma.refreshToken.deleteMany({
        where: { token }
      });
    }
  }

  // Logic lấy Profile
  static async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      throw new Error('Không tìm thấy người dùng trong hệ thống.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.createdAt
    };
  }
}
