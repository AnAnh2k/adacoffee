import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold uppercase tracking-wider">
                <i className="fas fa-coffee text-primary"></i>
                <span>ADA Coffee</span>
              </Link>
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
              <li><Link to="/about" className="text-gray-500 text-sm hover:text-primary transition-colors">Giới thiệu</Link></li>
              <li><Link to="/news" className="text-gray-500 text-sm hover:text-primary transition-colors">Tin tức</Link></li>
              <li><Link to="/contact" className="text-gray-500 text-sm hover:text-primary transition-colors">Liên hệ</Link></li>
              <li><Link to="#" className="text-gray-500 text-sm hover:text-primary transition-colors">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h6 className="text-sm font-bold uppercase tracking-widest mb-6">Tài khoản</h6>
            <ul className="space-y-3">
              <li><Link to="/login" className="text-gray-500 text-sm hover:text-primary transition-colors">Đăng nhập</Link></li>
              <li><Link to="/cart" className="text-gray-500 text-sm hover:text-primary transition-colors">Giỏ hàng</Link></li>
              <li><Link to="/register" className="text-gray-500 text-sm hover:text-primary transition-colors">Đăng ký</Link></li>
              <li><Link to="#" className="text-gray-500 text-sm hover:text-primary transition-colors">Đơn hàng</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="text-sm font-bold uppercase tracking-widest mb-6">Liên hệ</h6>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <i className="fas fa-map-marker-alt mt-1 text-primary"></i>
                <span>Số 3 phố Cầu Giấy, quận Đống Đa, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <i className="fas fa-phone text-primary"></i>
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <i className="fas fa-envelope text-primary"></i>
                <span>contact@adacoffee.com</span>
              </li>
            </ul>
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
