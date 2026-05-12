import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onQuickView }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100 rounded-lg">
        <img 
          src={`/img/products/${product.img}`} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://placehold.co/300x400?text=Sản+phẩm'; }}
        />
        {/* Hover Actions */}
        <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <li>
            <button 
              onClick={() => onQuickView(product)}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg text-gray-700"
              title="Xem nhanh"
            >
              <i className="fas fa-expand-alt"></i>
            </button>
          </li>
          <li>
            <button 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg text-gray-700"
              title="Thêm vào giỏ"
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
          </li>
        </ul>
      </div>
      <div className="text-center px-2">
        <Link 
          to={`/product/${product.id}`}
          className="text-sm font-bold mb-2 block hover:text-primary transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <div className="text-primary font-bold">{product.price.toLocaleString()} ₫</div>
      </div>
    </div>
  );
};

export default ProductCard;
