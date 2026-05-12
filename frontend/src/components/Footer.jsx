import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="mb-6">
              <a href="/" className="flex items-center gap-2 text-xl font-bold uppercase tracking-wider">
                <i className="fas fa-coffee text-primary"></i>
                <span>ADA Coffee</span>
              </a>
            </div>
            <p className="text-gray-500 text-sm leading-loose">
              Nơi cuộc hẹn tròn đầy với cà phê, món ăn nhẹ và không gian cảm hứng. Chúng tôi mang đến trải nghiệm tốt nhất cho khách hàng.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-full text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-full text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center rounded-full text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-sm font-bold uppercase tracking-widest mb-6">Liên kết nhanh</h6>
            <ul className="space-y-3">
              <li><a href="/about" className="text-gray-500 text-sm hover:text-primary transition-colors">Giới thiệu</a></li>
              <li><a href="/news" className="text-gray-500 text-sm hover:text-primary transition-colors">Tin tức</a></li>
              <li><a href="/contact" className="text-gray-500 text-sm hover:text-primary transition-colors">Liên hệ</a></li>
              <li><a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h6 className="text-sm font-bold uppercase tracking-widest mb-6">Tài khoản</h6>
            <ul className="space-y-3">
              <li><a href="/login" className="text-gray-500 text-sm hover:text-primary transition-colors">Đăng nhập</a></li>
              <li><a href="/cart" className="text-gray-500 text-sm hover:text-primary transition-colors">Giỏ hàng</a></li>
              <li><a href="/register" className="text-gray-500 text-sm hover:text-primary transition-colors">Đăng ký</a></li>
              <li><a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors">Đơn hàng</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h6 className="text-sm font-bold uppercase tracking-widest mb-6">Bản tin</h6>
            <p className="text-gray-500 text-sm mb-6">Đăng ký nhận tin để không bỏ lỡ các ưu đãi mới nhất.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="w-full h-12 px-5 pr-16 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary"
              />
              <button className="absolute right-0 top-0 h-12 px-6 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest">
                Gửi
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-xs">
            Copyright © {new Date().getFullYear()} All rights reserved | This template is made with <i className="fa fa-heart text-primary"></i> by ADA Coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
