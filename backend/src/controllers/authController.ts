import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';
import { AuthRequest, UserPayload } from '../middlewares/authMiddleware';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'ada_coffee_access_token_secret_key_12345';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ada_coffee_refresh_token_secret_key_67890';

// Đăng ký tài khoản mới
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  // Validate đầu vào
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Vui lòng điền đầy đủ các thông tin: Tên, Email và Mật khẩu.' });
    return;
  }

  try {
    // Kiểm tra xem email đã tồn tại hay chưa
    const checkUserRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkUserRes.rows.length > 0) {
      res.status(400).json({ message: 'Email này đã được sử dụng. Vui lòng chọn email khác.' });
      return;
    }

    // Mã hoá mật khẩu bằng bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Lưu người dùng vào database
    const insertUserRes = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
      [name, email, hashedPassword, 'user']
    );

    const newUser = insertUserRes.rows[0];
    res.status(201).json({
      message: 'Đăng ký tài khoản thành công!',
      user: newUser
    });
  } catch (error) {
    console.error('[authController - Register error]:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống khi đăng ký.' });
  }
};

// Đăng nhập
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Vui lòng nhập Email và Mật khẩu.' });
    return;
  }

  try {
    // Tìm người dùng theo email
    const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userRes.rows.length === 0) {
      res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
      return;
    }

    const user = userRes.rows[0];

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
      return;
    }

    const userPayload: UserPayload = {
      id: user.id,
      email: user.email,
      role: user.role
    };

    // Tạo Access Token (15 phút) và Refresh Token (7 ngày)
    const accessToken = jwt.sign(userPayload, ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(userPayload, REFRESH_SECRET, { expiresIn: '7d' });

    // Lưu Refresh Token vào HttpOnly Cookie bảo mật
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Chạy production mới bật https
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày tính bằng milliseconds
    });

    // Trả về Access Token và thông tin user cho Client
    res.json({
      message: 'Đăng nhập thành công!',
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at
      }
    });
  } catch (error) {
    console.error('[authController - Login error]:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống khi đăng nhập.' });
  }
};

// Làm mới Access Token (sử dụng Refresh Token lưu trong Cookie)
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: 'Không tìm thấy Refresh Token. Vui lòng đăng nhập lại.' });
    return;
  }

  try {
    jwt.verify(refreshToken, REFRESH_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ message: 'Refresh Token đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.' });
        return;
      }

      const payload = decoded as UserPayload;
      const userPayload: UserPayload = {
        id: payload.id,
        email: payload.email,
        role: payload.role
      };

      // Tạo một Access Token mới
      const newAccessToken = jwt.sign(userPayload, ACCESS_SECRET, { expiresIn: '15m' });

      res.json({
        accessToken: newAccessToken
      });
    });
  } catch (error) {
    console.error('[authController - Refresh token error]:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống khi làm mới token.' });
  }
};

// Đăng xuất
export const logout = (req: Request, res: Response): void => {
  // Xoá Refresh Token khỏi Cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  res.json({ message: 'Đăng xuất thành công!' });
};

// Lấy thông tin tài khoản hiện tại (Protected)
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Không thể xác định danh tính. Vui lòng đăng nhập.' });
    return;
  }

  try {
    const userRes = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (userRes.rows.length === 0) {
      res.status(404).json({ message: 'Không tìm thấy người dùng trong hệ thống.' });
      return;
    }

    res.json({
      user: userRes.rows[0]
    });
  } catch (error) {
    console.error('[authController - GetMe error]:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống khi lấy thông tin tài khoản.' });
  }
};
