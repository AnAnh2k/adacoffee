import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import categoryRoutes from '../modules/categories/category.routes';
import productRoutes from '../modules/products/product.routes';

const router = Router();

// Gắn các router con từ các module vào đây
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);

export default router;
