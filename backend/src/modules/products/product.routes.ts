import { Router } from 'express';
import { getProducts, getProductById, getRelatedProducts } from './product.controller';

const router = Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// GET /api/products/:id/related
router.get('/:id/related', getRelatedProducts);

export default router;
