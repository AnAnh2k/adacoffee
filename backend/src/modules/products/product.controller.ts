import { Request, Response } from "express";
import { ProductService } from "./product.service";

// API: Lấy danh sách sản phẩm (có lọc, tìm kiếm, phân trang)
export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { search, categoryId, sort, page, limit } = req.query;
    const result = await ProductService.getAllProducts({
      search: search as string,
      categoryId: categoryId as string,
      sort: sort as string,
      page: page as string,
      limit: limit as string,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "Lỗi khi lấy danh sách sản phẩm." });
  }
};

// API: Lấy chi tiết sản phẩm theo ID
export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = req.params.id as string;
  try {
    const product = await ProductService.getProductById(parseInt(id, 10));
    if (!product) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm." });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "Lỗi khi lấy chi tiết sản phẩm." });
  }
};

// API: Lấy danh sách sản phẩm liên quan
export const getRelatedProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = req.params.id as string;
  try {
    const product = await ProductService.getProductById(parseInt(id, 10));
    if (!product) {
      res.status(404).json({ message: "Không tìm thấy sản phẩm." });
      return;
    }
    const related = await ProductService.getRelatedProducts(
      product.id,
      product.categoryId,
    );
    res.status(200).json(related);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "Lỗi khi lấy sản phẩm liên quan." });
  }
};
