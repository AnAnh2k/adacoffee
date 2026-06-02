import prisma from '../../lib/prisma';

export const CategoryService = {
  // Lấy toàn bộ danh mục sản phẩm sắp xếp theo bảng chữ cái
  getAllCategories: async () => {
    return await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  }
};
