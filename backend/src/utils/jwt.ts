import jwt from 'jsonwebtoken';
import { UserPayload } from '../middlewares/authenticate';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'ada_coffee_access_token_secret_key_12345';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ada_coffee_refresh_token_secret_key_67890';

// Sinh Access Token (15 phút)
export const generateAccessToken = (payload: UserPayload): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
};

// Sinh Refresh Token (7 ngày)
export const generateRefreshToken = (payload: UserPayload): string => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
};
