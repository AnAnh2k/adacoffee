import React from 'react';

const Home = () => {
  const sampleProducts = [
    { id: 1, name: 'Cà phê sữa đá', price: '29,000 ₫', img: 'ca-phe-sua-da.jpeg' },
    { id: 2, name: 'Bạc xỉu đá', price: '32,000 ₫', img: 'bac-xiu-da.jpeg' },
    { id: 3, name: 'Trà đào cam sả', price: '45,000 ₫', img: 'tra-dao.jpeg' },
    { id: 4, name: 'Bánh Flan', price: '25,000 ₫', img: 'banh-flan.jpg' },
    { id: 5, name: 'Americano đá', price: '35,000 ₫', img: 'americano-da.jpeg' },
    { id: 6, name: 'Trà sữa Matcha', price: '49,000 ₫', img: 'tra-sua-matcha.jpeg' },
    { id: 7, name: 'Sinh tố dâu', price: '55,000 ₫', img: 'sinh-to-dau.jpeg' },
    { id: 8, name: 'Trà vải', price: '45,000 ₫', img: 'tra-vai.jpeg' },
  ];

  const sampleNews = [
    { id: 1, title: 'Hành trình từ hạt cà phê đến ly tách', date: '20/05/2024', img: 'blog-1.jpg' },
    { id: 2, title: 'Cách pha cà phê ngon tại nhà', date: '18/05/2024', img: 'blog-2.jpg' },
    { id: 3, title: 'Không gian làm việc lý tưởng tại The Space', date: '15/05/2024', img: 'blog-3.jpg' },
  ];

  return (
    <div className="pt-20"> {/* Padding top to avoid overlap with fixed header */}
      
      {/* Categories Section */}
      <section className="py-2 px-2">
        <div className="flex flex-wrap h-[600px]">
          {/* Large Item */}
          <div className="w-full lg:w-1/2 p-1">
            <div 
              className="h-full relative overflow-hidden group cursor-pointer bg-cover bg-center"
              style={{ backgroundImage: `url('/img/categories/category-1.jpg')` }}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
              <div className="absolute left-10 top-1/2 -translate-y-1/2 max-w-xs">
                <h1 className="text-5xl font-bold mb-4">ADA Coffee</h1>
                <p className="text-gray-700 mb-6 text-sm">Ghé thăm ADA Coffee - Không gian cà phê đậm chất riêng của Đức Anh.</p>
                <a href="/products" className="text-xs font-bold uppercase border-b-2 border-primary pb-1 hover:text-primary transition-colors">Xem ngay</a>
              </div>
            </div>
          </div>
          
          {/* Grid Items */}
          <div className="w-full lg:w-1/2 flex flex-wrap">
            <div className="w-full sm:w-1/2 p-1 h-1/2">
              <div className="h-full relative bg-cover bg-center" style={{ backgroundImage: `url('/img/categories/category-2.jpg')` }}>
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-xl font-bold mb-1">Trà</h4>
                  <p className="text-gray-600 text-xs mb-3">Không chỉ có cà phê</p>
                  <a href="/products?type=5" className="text-[10px] font-bold uppercase border-b-2 border-primary pb-1">Xem ngay</a>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-1 h-1/2">
              <div className="h-full relative bg-cover bg-center" style={{ backgroundImage: `url('/img/categories/category-3.jpg')` }}>
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-xl font-bold mb-1">Tin tức</h4>
                  <p className="text-gray-600 text-xs mb-3">Cập nhật tin tức mới nhất</p>
                  <a href="/news" className="text-[10px] font-bold uppercase border-b-2 border-primary pb-1">Xem ngay</a>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-1 h-1/2">
              <div className="h-full relative bg-cover bg-center" style={{ backgroundImage: `url('/img/categories/category-4.jpg')` }}>
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-xl font-bold mb-1">Giới thiệu</h4>
                  <p className="text-gray-600 text-xs mb-3">Chúng tôi là ai</p>
                  <a href="/about" className="text-[10px] font-bold uppercase border-b-2 border-primary pb-1">Xem ngay</a>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-1 h-1/2">
              <div className="h-full relative bg-cover bg-center" style={{ backgroundImage: `url('/img/categories/category-5.jpg')` }}>
                <div className="absolute left-6 bottom-6">
                  <h4 className="text-xl font-bold mb-1">Liên hệ</h4>
                  <p className="text-gray-600 text-xs mb-3">Nhắn tin cho chúng tôi</p>
                  <a href="/contact" className="text-[10px] font-bold uppercase border-b-2 border-primary pb-1">Xem ngay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="mb-12">
          <h4 className="text-2xl font-bold uppercase inline-block border-b-2 border-primary pb-2">Sản phẩm nổi bật</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sample Product */}
          {sampleProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
                <img 
                  src={`/img/products/${product.img}`} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://placehold.co/300x400?text=Sản+phẩm'; }}
                />
                <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <li>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md">
                      <i className="fas fa-expand-alt"></i>
                    </button>
                  </li>
                  <li>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <h6 className="text-sm font-semibold mb-2 hover:text-primary cursor-pointer transition-colors">
                  {product.name}
                </h6>
                <div className="text-primary font-bold">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner Section */}
      <section className="h-[400px] bg-cover bg-center relative mb-20" style={{ backgroundImage: `url('/img/banner/banner-1.jpg')` }}>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="text-primary uppercase tracking-[4px] font-semibold text-sm mb-4 block">Ưu đãi lớn</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Giảm giá 50% cho đơn hàng đầu tiên</h1>
            <a href="/products" className="inline-block bg-primary text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">Mua ngay</a>
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
                  onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Tin+tức'; }}
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
              onError={(e) => { e.target.src = `https://placehold.co/400x400?text=Gallery+${item}`; }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fab fa-instagram text-white text-2xl"></i>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Home;
