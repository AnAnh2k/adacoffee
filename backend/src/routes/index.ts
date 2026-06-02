import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';

const router = Router();

// Gắn các router con từ các module vào đây
router.use('/auth', authRoutes);

export default router;
