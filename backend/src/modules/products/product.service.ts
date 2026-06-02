import prisma from "../../lib/prisma";

export const ProductService = {
  // Lấy danh sách sản phẩm kèm theo bộ lọc, sắp xếp, tìm kiếm và phân trang
  getAllProducts: async (query: {
    search?: string;
    categoryId?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }) => {
    const page = parseInt(query.page || "1", 10);
    const limit = parseInt(query.limit || "12", 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    // 1. Tìm kiếm theo tên sản phẩm (không phân biệt hoa/thường)
    if (query.search) {
      where.name = {
        contains: query.search,
        mode: "insensitive",
      };
    }

    // 2. Lọc theo danh mục
    if (query.categoryId) {
      where.categoryId = parseInt(query.categoryId, 10);
    }

    // 3. Sắp xếp
    let orderBy: any = { createdAt: "desc" }; // Mặc định sản phẩm mới nhất lên đầu
    if (query.sort) {
      if (query.sort === "price_asc") {
        orderBy = { price: "asc" };
      } else if (query.sort === "price_desc") {
        orderBy = { price: "desc" };
      }
    }

    // Thực hiện truy vấn song song (Prisma Transaction) để lấy tổng số lượng và danh sách sản phẩm
    const [total, products] = await prisma.$transaction([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
    ]);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Lấy chi tiết một sản phẩm cụ thể qua ID
  getProductById: async (id: number) => {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  },

  // Gợi ý sản phẩm liên quan (Cùng danh mục nhưng loại bỏ chính sản phẩm hiện tại)
  getRelatedProducts: async (id: number, categoryId: number, limit = 4) => {
    return await prisma.product.findMany({
      where: {
        categoryId,
        id: {
          not: id,
        },
      },
      take: limit,
    });
  },
};
