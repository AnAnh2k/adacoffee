import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../data/products';

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const sampleProducts: Product[] = [
    { id: 1, categoryId: 1, name: 'Cà phê sữa đá', price: 29000, img: 'ca-phe-sua-da.jpeg' },
    { id: 2, categoryId: 1, name: 'Bạc xỉu đá', price: 32000, img: 'bac-xiu-da.jpeg' },
    { id: 3, categoryId: 3, name: 'Trà đào cam sả', price: 45000, img: 'tra-dao.jpeg' },
    { id: 4, categoryId: 5, name: 'Bánh Flan', price: 25000, img: 'banh-flan.jpg' },
    { id: 5, categoryId: 2, name: 'Americano đá', price: 35000, img: 'americano-da.jpeg' },
    { id: 6, categoryId: 4, name: 'Trà sữa Matcha', price: 49000, img: 'tra-sua-matcha.jpeg' },
    { id: 7, categoryId: 4, name: 'Sinh tố dâu', price: 55000, img: 'sinh-to-dau.jpeg' },
    { id: 8, categoryId: 3, name: 'Trà vải', price: 45000, img: 'tra-vai.jpeg' },
  ];

  interface NewsItem {
    id: number;
    title: string;
    date: string;
    img: string;
  }

  const sampleNews: NewsItem[] = [
    { id: 1, title: 'Hành trình từ hạt cà phê đến ly tách', date: '20/05/2024', img: 'blog-1.jpg' },
    { id: 2, title: 'Cách pha cà phê ngon tại nhà', date: '18/05/2024', img: 'blog-2.jpg' },
    { id: 3, title: 'Không gian làm việc lý tưởng tại ADA COFFEE', date: '15/05/2024', img: 'blog-3.jpg' },
  ];


  return (
    <>
    <div className="pt-20">
      
      {/* Categories Section */}
      <section className="py-2 px-2">
        <div className="flex flex-wrap h-[600px]">
          <div className="w-full lg:w-1/2 p-1">
            <div 
              className="h-full relative overflow-hidden group cursor-pointer bg-cover bg-center"
              style={{ backgroundImage: `url('/img/categories/category-1.jpg')` }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-xs">
                <h1 className="text-5xl font-bold mb-4">ADA Coffee</h1>
                <p className="text-gray-700 mb-6 text-sm">Ghé thăm ADA Coffee - Không gian cà phê đậm chất riêng của Đức Anh.</p>
                <Link to="/products" className="text-xs font-bold uppercase border-b-2 border-primary pb-1 hover:text-primary transition-colors">Xem ngay</Link>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-wrap">
            <div className="w-full sm:w-1/2 p-1 h-1/2">
              <div className="h-full relative bg-cover bg-center" style={{ backgroundImage: `url('/img/categories/category-2.jpg')` }}>
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-xl font-bold mb-1">Trà</h4>
                  <p className="text-gray-600 text-xs mb-3">Không chỉ có cà phê</p>
                  <Link to="/products" className="text-[10px] font-bold uppercase border-b-2 border-primary pb-1">Xem ngay</Link>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-1 h-1/2">
              <div className="h-full relative bg-cover bg-center" style={{ backgroundImage: `url('/img/categories/category-3.jpg')` }}>
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-xl font-bold mb-1">Tin tức</h4>
                  <p className="text-gray-600 text-xs mb-3">Cập nhật tin tức mới nhất</p>
                  <Link to="/news" className="text-[10px] font-bold uppercase border-b-2 border-primary pb-1">Xem ngay</Link>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-1 h-1/2">
              <div className="h-full relative bg-cover bg-center" style={{ backgroundImage: `url('/img/categories/category-4.jpg')` }}>
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-xl font-bold mb-1">Giới thiệu</h4>
                  <p className="text-gray-600 text-xs mb-3">Chúng tôi là ai</p>
                  <Link to="/about" className="text-[10px] font-bold uppercase border-b-2 border-primary pb-1">Xem ngay</Link>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-1 h-1/2">
              <div className="h-full relative bg-cover bg-center" style={{ backgroundImage: `url('/img/categories/category-5.jpg')` }}>
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-xl font-bold mb-1">Liên hệ</h4>
                  <p className="text-gray-600 text-xs mb-3">Nhắn tin cho chúng tôi</p>
                  <Link to="/contact" className="text-[10px] font-bold uppercase border-b-2 border-primary pb-1">Xem ngay</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h4 className="text-2xl font-bold uppercase inline-block border-b-2 border-primary pb-2">Sản phẩm nổi bật</h4>
          </div>
          <Link to="/products" className="text-xs font-bold uppercase text-gray-400 hover:text-primary transition-colors">Xem tất cả</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sampleProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickView={handleQuickView} 
            />
          ))}
        </div>
      </section>

      {/* Banner Section */}
      <section className="h-[400px] bg-cover bg-center relative mb-20" style={{ backgroundImage: `url('/img/banner/banner-1.jpg')` }}>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-primary uppercase tracking-[4px] font-semibold text-sm mb-4 block">Ưu đãi lớn</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Giảm giá 50% cho đơn hàng đầu tiên</h1>
            <Link to="/products" className="inline-block bg-primary text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">Mua ngay</Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 container mx-auto px-4 bg-white">
        <div className="mb-12">
          <h4 className="text-2xl font-bold uppercase inline-block border-b-2 border-primary pb-2">Tin tức mới nhất</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleNews.map((news) => (
            <div key={news.id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-video mb-6 rounded-lg">
                <img 
                  src={`/img/blog/${news.img}`} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400?text=Tin+tức'; }}
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-2 uppercase tracking-widest font-semibold">{news.date}</div>
                <h6 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
                  {news.title}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram/Gallery Section */}
      <section className="flex flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="w-1/2 md:w-1/3 lg:w-1/6 aspect-square relative group cursor-pointer overflow-hidden">
            <img 
              src={`/img/instagram/insta-${item}.jpg`} 
              alt="Gallery" 
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = `https://placehold.co/400x400?text=Gallery+${item}`; }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fab fa-instagram text-white text-2xl"></i>
            </div>
          </div>
        ))}
      </section>

    </div>
    <ProductModal 
      product={selectedProduct} 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
};

export default Home;
