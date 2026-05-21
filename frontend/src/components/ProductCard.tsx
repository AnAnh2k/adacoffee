import { Link } from "react-router-dom";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100 rounded-lg">
        <img
          src={`/img/products/${product.img}`}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/300x400?text=Sản+phẩm";
          }}
        />
        {/* Hover Actions */}
        <ul className="absolute flex space-x-3 transition-all duration-300 transform -translate-x-1/2 translate-y-4 -translate-y-1/2 opacity-0 top-1/2 left-1/2 group-hover:opacity-100 group-hover:translate-y-0">
          <li>
            <button
              onClick={() => onQuickView(product)}
              className="flex items-center justify-center w-12 h-12 text-gray-700 transition-all bg-white rounded-full shadow-lg hover:bg-primary hover:text-white"
              title="Xem nhanh"
            >
              <i className="fas fa-expand-alt"></i>
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-center w-12 h-12 text-gray-700 transition-all bg-white rounded-full shadow-lg hover:bg-primary hover:text-white"
              title="Thêm vào giỏ"
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
          </li>
        </ul>
      </div>
      <div className="px-2 text-center">
        <Link
          to={`/product/${product.id}`}
          className="block mb-2 text-sm font-bold transition-colors hover:text-primary line-clamp-1"
        >
          {product.name}
        </Link>
        <div className="font-bold text-primary">
          {product.price.toLocaleString()} ₫
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
