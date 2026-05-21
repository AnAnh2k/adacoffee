import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all z-10"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto">
          {/* Product Image */}
          <div className="w-full md:w-1/2 bg-gray-50">
            <img 
              src={`/img/products/${product.img}`} 
              alt={product.name} 
              className="w-full h-full object-cover min-h-[400px]"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x800?text=Sản+phẩm'; }}
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-6">
              <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">Chi tiết sản phẩm</span>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <div className="text-2xl font-bold text-primary mb-6">{product.price.toLocaleString()} ₫</div>
            </div>

            <div className="space-y-6">
              <div>
                <h6 className="text-sm font-bold uppercase mb-2">Thành phần:</h6>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Hạt cà phê nguyên chất, sữa đặc cao cấp, đá viên tinh khiết. Công thức pha chế độc quyền giúp giữ trọn hương vị đậm đà đặc trưng của ADA Coffee.
                </p>
              </div>

              <div>
                <h6 className="text-sm font-bold uppercase mb-2">Mô tả:</h6>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Một thức uống giải nhiệt tuyệt vời cho những ngày nắng nóng. Sự kết hợp hoàn hảo giữa vị đắng của cà phê và vị ngọt béo của sữa.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button className="w-full h-14 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-3">
                  <i className="fas fa-shopping-bag"></i>
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
