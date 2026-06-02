import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthRequest } from '../../middlewares/authenticate';

// Đăng ký tài khoản mới
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Vui lòng điền đầy đủ các thông tin: Tên, Email và Mật khẩu.' });
    return;
  }

  try {
    const user = await AuthService.register(name, email, password);
    res.status(201).json({
      message: 'Đăng ký tài khoản thành công!',
      user
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Đã xảy ra lỗi hệ thống khi đăng ký.' });
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
    const { accessToken, refreshToken, user } = await AuthService.login(email, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 ngày
    });

    res.json({
      message: 'Đăng nhập thành công!',
      accessToken,
      user
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Đăng nhập thất bại.' });
  }
};

// Làm mới Access Token
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401).json({ message: 'Không tìm thấy Refresh Token. Vui lòng đăng nhập lại.' });
    return;
  }

  try {
    const result = await AuthService.refresh(token);
    res.json(result);
  } catch (error: any) {
    res.status(403).json({ message: error.message || 'Làm mới token thất bại.' });
  }
};

// Đăng xuất
export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.refreshToken;

  try {
    await AuthService.logout(token);
  } catch (error) {
    console.error('[authController - Logout error]:', error);
  }

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
    const user = await AuthService.getProfile(req.user.id);
    res.json({ user });
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Không tìm thấy người dùng.' });
  }
};
