import React, { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = products
    .filter(p => !selectedCategory || p.categoryId === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

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
                    onClick={() => setSelectedCategory(null)}
                    className={`text-sm transition-colors ${!selectedCategory ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                  >
                    Tất cả sản phẩm
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setSelectedCategory(cat.id)}
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
              <div className="text-sm text-gray-500">
                Hiển thị {filteredProducts.length} sản phẩm
              </div>
              <select 
                className="text-sm border-none bg-transparent focus:ring-0 cursor-pointer font-semibold uppercase tracking-widest"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Sắp xếp mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={handleQuickView} 
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center space-x-2">
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-full bg-black text-white">1</button>
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all">2</button>
              <button className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-all">
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
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
