import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Định nghĩa cấu trúc thông tin User lưu trong Token
export interface UserPayload {
  id: number;
  email: string;
  role: string;
}

// Mở rộng interface Request của Express để chứa trường user
export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Lấy token từ header Authorization (định dạng: 'Bearer TOKEN')
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[0] === 'Bearer' ? authHeader.split(' ')[1] : authHeader;

  if (!token) {
    res.status(401).json({ message: 'Không tìm thấy Access Token. Vui lòng đăng nhập.' });
    return;
  }

  const accessSecret = process.env.JWT_ACCESS_SECRET || 'ada_coffee_access_token_secret_key_12345';

  jwt.verify(token, accessSecret, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Access Token đã hết hạn hoặc không hợp lệ.' });
      return;
    }

    // Gán thông tin user đã giải mã vào req.user
    req.user = decoded as UserPayload;
    next();
  });
};
