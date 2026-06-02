import React, { useState, useEffect } from 'react';
import { Product } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';
import ProductModal from '../../components/product/ProductModal';
import { productService } from '../../services/productService';
import toast from 'react-hot-toast';

interface CategoryAPI {
  id: number;
  name: string;
  slug: string;
}

const Products = () => {
  const [categoriesList, setCategoriesList] = useState<CategoryAPI[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  // Tải danh mục sản phẩm từ API khi khởi tạo
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getCategories();
        setCategoriesList(response.data);
      } catch (err: any) {
        console.error('Lỗi khi tải danh mục:', err);
        toast.error('Không thể tải danh mục sản phẩm.');
      }
    };
    fetchCategories();
  }, []);

  // Tải danh sách sản phẩm kèm theo các bộ lọc
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getProducts({
          page,
          limit: 9,
          categoryId: selectedCategory,
          sort: sortOrder,
        });
        
        // Chuyển đổi tên thuộc tính 'image' của Database sang 'img' để tương thích với component cũ
        const mappedProducts = response.data.products.map((p: any) => ({
          id: p.id,
          categoryId: p.categoryId,
          name: p.name,
          price: p.price,
          img: p.image || '',
          description: p.description
        }));

        setProductsList(mappedProducts);
        setTotalPages(response.data.pagination.totalPages);
        setTotalProducts(response.data.pagination.total);
      } catch (err: any) {
        console.error('Lỗi khi tải sản phẩm:', err);
        toast.error('Không thể tải danh sách sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortOrder, page]);

  // Đổi bộ lọc danh mục (reset về trang 1)
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
    <div className="pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 mb-10">
        <div className="container mx-auto px-4">
          <div className="text-xs uppercase tracking-widest flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">Trang chủ</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400 font-bold">Sản phẩm</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="mb-10">
              <h5 className="text-sm font-bold uppercase tracking-widest mb-6 border-b-2 border-primary inline-block pb-1">Danh mục</h5>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => handleCategorySelect(null)}
                    className={`text-sm transition-colors ${!selectedCategory ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                  >
                    Tất cả sản phẩm
                  </button>
                </li>
                {categoriesList.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`text-sm transition-colors ${selectedCategory === cat.id ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-6 border-b-2 border-primary inline-block pb-1">Lọc theo giá</h5>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="accent-primary" /> 0₫ - 50.000₫
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="accent-primary" /> 50.000₫ - 100.000₫
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <div className="text-sm text-gray-500 font-medium">
                {loading ? 'Đang tải dữ liệu...' : `Hiển thị ${totalProducts} sản phẩm`}
              </div>
              <select 
                className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer font-semibold uppercase tracking-widest focus:outline-none"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setPage(1);
                }}
              >
                <option value="default">Sắp xếp mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Skeletons Loading cho đẹp */}
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="space-y-4 animate-pulse">
                    <div className="bg-gray-100 aspect-[3/4] w-full rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : productsList.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <i className="fas fa-mug-hot text-4xl mb-4 text-stone-300"></i>
                <p>Không có sản phẩm nào phù hợp với bộ lọc.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-[fadeIn_0.3s_ease-out]">
                {productsList.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onQuickView={handleQuickView} 
                  />
                ))}
              </div>
            )}

            {/* Phân trang động */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex justify-center space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 border border-gray-200 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                      page === i + 1 
                        ? 'bg-black text-white border-black font-bold' 
                        : 'hover:bg-black hover:text-white bg-white text-gray-700 hover:border-black'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
    <ProductModal 
      product={selectedProduct} 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
};

export default Products;
