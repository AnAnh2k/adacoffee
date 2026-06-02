import { Router } from 'express';
import { register, login, refreshToken, logout, getMe } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Đường dẫn API xác thực không yêu cầu token
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

// Đường dẫn API yêu cầu xác thực Access Token
router.get('/me', authenticateToken as any, getMe as any);

export default router;
