import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 bg-white border-t border-gray-100">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold tracking-wider uppercase"
              >
                <i className="fas fa-coffee text-primary"></i>
                <span>ADA Coffee</span>
              </Link>
            </div>
            <p className="text-sm leading-loose text-gray-500">
              Nơi cuộc hẹn tròn đầy với cà phê, món ăn nhẹ và không gian cảm
              hứng. Chúng tôi mang đến trải nghiệm tốt nhất cho khách hàng.
            </p>
            <div className="flex mt-6 space-x-4">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all border border-gray-200 rounded-full hover:bg-primary hover:text-white hover:border-primary"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all border border-gray-200 rounded-full hover:bg-primary hover:text-white hover:border-primary"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 text-gray-500 transition-all border border-gray-200 rounded-full hover:bg-primary hover:text-white hover:border-primary"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="mb-6 text-sm font-bold tracking-widest uppercase">
              Liên kết nhanh
            </h6>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h6 className="mb-6 text-sm font-bold tracking-widest uppercase">
              Tài khoản
            </h6>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  Giỏ hàng
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 transition-colors hover:text-primary"
                >
                  Đơn hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="mb-6 text-sm font-bold tracking-widest uppercase">
              Liên hệ
            </h6>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <i className="mt-1 fas fa-map-marker-alt text-primary"></i>
                <span>96 Định Công, Hà Nội</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <i className="fas fa-phone text-primary"></i>
                <span>0888 888 888</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <i className="fas fa-envelope text-primary"></i>
                <span>anducanh125@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Copyright © {new Date().getFullYear()} All rights reserved | This
            template is made with <i className="fa fa-heart text-primary"></i>{" "}
            by An Duc Anh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
