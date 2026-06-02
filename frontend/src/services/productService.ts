import api from './api';

export const productService = {
  // Lấy toàn bộ danh mục sản phẩm
  getCategories: () => 
    api.get('/categories'),
    
  // Lấy danh sách sản phẩm theo bộ lọc (phân trang, danh mục, sắp xếp)
  getProducts: (params: { page: number; limit: number; categoryId?: number | null; sort?: string }) => {
    let url = `/products?page=${params.page}&limit=${params.limit}`;
    if (params.categoryId) {
      url += `&categoryId=${params.categoryId}`;
    }
    if (params.sort && params.sort !== 'default') {
      if (params.sort === 'price-asc') {
        url += `&sort=price_asc`;
      } else if (params.sort === 'price-desc') {
        url += `&sort=price_desc`;
      }
    }
    return api.get(url);
  },
  
  // Lấy thông tin chi tiết một sản phẩm
  getProductById: (id: string | number) => 
    api.get(`/products/${id}`),
    
  // Lấy các sản phẩm liên quan
  getRelatedProducts: (id: string | number) => 
    api.get(`/products/${id}/related`),
};
