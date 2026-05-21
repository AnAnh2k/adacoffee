import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }): string => 
    `text-sm font-semibold uppercase transition-colors relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
      isActive ? 'text-primary after:w-full' : 'text-gray-700 hover:text-primary after:w-0 hover:after:w-full'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center gap-2 text-xl font-bold uppercase tracking-wider">
              <i className="fas fa-coffee text-primary"></i>
              <span>ADA Coffee</span>
            </NavLink>
          </div>

          {/* Menu chính */}
          <nav className="hidden md:flex items-center space-x-10">
            <NavLink to="/" className={navLinkClass}>Trang chủ</NavLink>
            <NavLink to="/products" className={navLinkClass}>Sản phẩm</NavLink>
            <NavLink to="/news" className={navLinkClass}>Tin tức</NavLink>
            <NavLink to="/about" className={navLinkClass}>Giới thiệu</NavLink>
          </nav>

          {/* Icon bên phải */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-700 hover:text-primary transition-colors">
              <i className="fas fa-search text-lg"></i>
            </button>
            <div className="hidden sm:flex items-center space-x-4">
              <a href="/login" className="text-xs font-semibold uppercase text-gray-600 hover:text-primary">Đăng nhập</a>
              <span className="text-gray-300">/</span>
              <a href="/register" className="text-xs font-semibold uppercase text-gray-600 hover:text-primary">Đăng ký</a>
            </div>
            <a href="/cart" className="relative text-gray-700 hover:text-primary transition-colors">
              <i className="fas fa-shopping-cart text-lg"></i>
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </a>
            {/* Mobile menu toggle */}
            <button className="md:hidden text-gray-700">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
