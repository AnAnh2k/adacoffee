import { Router } from 'express';
import { register, login, refreshToken, logout, getMe } from './auth.controller';
import { authenticateToken } from '../../middlewares/authenticate';

const router = Router();

// Routes công cộng
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout as any);

// Route yêu cầu xác thực
router.get('/me', authenticateToken as any, getMe as any);

export default router;
