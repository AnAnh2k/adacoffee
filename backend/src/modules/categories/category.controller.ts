import { Request, Response } from 'express';
import { CategoryService } from './category.service';

// API: Lấy danh sách toàn bộ danh mục sản phẩm
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Lỗi khi lấy danh sách danh mục sản phẩm.' });
  }
};
