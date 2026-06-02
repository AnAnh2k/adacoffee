import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface UserPayload {
  id: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
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

    req.user = decoded as UserPayload;
    next();
  });
};
