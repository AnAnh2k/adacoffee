import { Router } from 'express';
import { getCategories } from './category.controller';

const router = Router();

// GET /api/categories
router.get('/', getCategories);

export default router;
