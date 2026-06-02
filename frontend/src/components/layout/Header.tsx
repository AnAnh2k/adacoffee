import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../common/Modal';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
            
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
                  <i className="far fa-user text-primary"></i>
                  <span>{user?.name}</span>
                </span>
                <span className="text-gray-300">|</span>
                <button 
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="text-xs font-semibold uppercase text-gray-600 hover:text-primary transition-colors cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-4">
                <Link to="/login" className="text-xs font-semibold uppercase text-gray-600 hover:text-primary transition-colors">Đăng nhập</Link>
                <span className="text-gray-300">/</span>
                <Link to="/register" className="text-xs font-semibold uppercase text-gray-600 hover:text-primary transition-colors">Đăng ký</Link>
              </div>
            )}

            <Link to="/cart" className="relative text-gray-700 hover:text-primary transition-colors">
              <i className="fas fa-shopping-cart text-lg"></i>
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
            {/* Mobile menu toggle */}
            <button className="md:hidden text-gray-700">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Modal xác nhận Đăng xuất */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Xác nhận đăng xuất"
        size="sm"
        footer={
          <>
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={() => {
                setIsLogoutModalOpen(false);
                logout();
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-red-700 rounded-lg transition-colors cursor-pointer shadow-md shadow-primary/20"
            >
              Đăng xuất
            </button>
          </>
        }
      >
        <div className="flex flex-col items-center text-center gap-3 py-2">
          <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 text-xl">
            <i className="fas fa-sign-out-alt"></i>
          </div>
          <p className="text-stone-600 font-medium">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình không?</p>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
