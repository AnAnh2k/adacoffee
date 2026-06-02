import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../data/products';
import ProductCard from '../../components/product/ProductCard';
import ProductModal from '../../components/product/ProductModal';
import { productService } from '../../services/productService';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  // Tải chi tiết sản phẩm và sản phẩm liên quan khi ID thay đổi
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        // 1. Gọi API lấy chi tiết sản phẩm
        const detailResponse = await productService.getProductById(id);
        const p = detailResponse.data;
        
        const mappedProduct: Product = {
          id: p.id,
          categoryId: p.categoryId,
          name: p.name,
          price: p.price,
          img: p.image || '',
          description: p.description
        };
        setProduct(mappedProduct);
        setQuantity(1); // Reset số lượng về 1 khi đổi sản phẩm

        // 2. Gọi API lấy sản phẩm liên quan (backend tự động xử lý lấy 4 sản phẩm)
        const relatedResponse = await productService.getRelatedProducts(id);
        const mappedRelated = relatedResponse.data.map((item: any) => ({
          id: item.id,
          categoryId: item.categoryId,
          name: item.name,
          price: item.price,
          img: item.image || '',
          description: item.description
        }));
        setRelatedProducts(mappedRelated);

      } catch (err: any) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', err);
        toast.error('Không thể tải thông tin sản phẩm.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleQuickView = (prod: Product) => {
    setSelectedProduct(prod);
    setIsModalOpen(true);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  if (loading) {
    return (
      <div className="pt-40 pb-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider animate-pulse">
          Đang tải thông tin sản phẩm...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm!</h2>
        <Link to="/products" className="text-primary font-bold border-b-2 border-primary hover:text-red-700 hover:border-red-700 transition-colors">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <>
    <div className="pt-24 pb-20 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-gray-50 py-4 mb-10">
        <div className="container mx-auto px-4">
          <div className="text-xs uppercase tracking-widest flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Sản phẩm</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400 font-bold">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Image Column */}
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] bg-gray-100">
              <img 
                src={`/img/products/${product.img}`} 
                alt={product.name} 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x800?text=Sản+phẩm'; }}
              />
            </div>
          </div>

          {/* Info Column */}
          <div className="w-full md:w-1/2 py-4">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl font-bold text-primary">{product.price.toLocaleString()} ₫</div>
              <div className="text-gray-400 line-through text-lg">{(product.price * 1.2).toLocaleString()} ₫</div>
            </div>

            <p className="text-gray-500 mb-8 leading-relaxed">
              {product.description || `Trải nghiệm hương vị tinh tế từ những hạt cà phê được tuyển chọn kỹ lưỡng. ${product.name} là sự lựa chọn hoàn hảo để bắt đầu một ngày mới đầy hứng khởi hoặc những phút giây thư giãn bên bạn bè.`}
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase w-24 text-gray-400">Tình trạng:</span>
                <span className="text-sm font-bold text-green-600">Còn hàng</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase w-24 text-gray-400">Số lượng:</span>
                <div className="flex items-center border border-gray-200 rounded-full h-12 overflow-hidden">
                  <button 
                    onClick={handleDecreaseQuantity}
                    className="px-5 hover:bg-gray-50 cursor-pointer text-gray-600 hover:text-black font-semibold"
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    value={quantity} 
                    className="w-12 text-center border-none focus:ring-0 text-sm font-bold text-gray-800" 
                    readOnly 
                  />
                  <button 
                    onClick={handleIncreaseQuantity}
                    className="px-5 hover:bg-gray-50 cursor-pointer text-gray-600 hover:text-black font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 h-14 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-primary transition-all cursor-pointer">
                Thêm vào giỏ
              </button>
              <button className="w-14 h-14 border border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer">
                <i className="far fa-heart"></i>
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <i className="fas fa-truck text-primary"></i>
                <span className="text-xs font-bold uppercase">Giao hàng nhanh</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-undo text-primary"></i>
                <span className="text-xs font-bold uppercase">Đổi trả trong 24h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Section */}
        <div className="mt-20">
          <div className="flex border-b border-gray-100 mb-10">
            <button className="px-8 py-4 text-sm font-bold uppercase border-b-2 border-primary tracking-widest">Mô tả chi tiết</button>
            <button className="px-8 py-4 text-sm font-bold uppercase border-gray-100 text-gray-400 tracking-widest">Đánh giá (0)</button>
          </div>
          <div className="max-w-3xl">
            <h5 className="text-lg font-bold mb-4">Về sản phẩm này</h5>
            <p className="text-gray-500 mb-6 leading-loose">
              Mỗi tách {product.name} tại ADA Coffee đều được pha chế bằng cả tâm huyết. Chúng tôi sử dụng nguồn nguyên liệu sạch, được kiểm định khắt khe để đảm bảo sức khỏe người dùng. 
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-500 text-sm">
              <li>Nguyên liệu 100% từ thiên nhiên</li>
              <li>Không sử dụng hóa chất bảo quản</li>
              <li>Pha chế mới ngay sau khi nhận đơn</li>
              <li>Đảm bảo vệ sinh an toàn thực phẩm</li>
            </ul>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-20 border-t border-gray-100">
            <div className="mb-12">
              <h4 className="text-2xl font-bold uppercase inline-block border-b-2 border-primary pb-2">Sản phẩm liên quan</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-[fadeIn_0.3s_ease-out]">
              {relatedProducts.map((item) => (
                <ProductCard 
                  key={item.id} 
                  product={item} 
                  onQuickView={handleQuickView} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <ProductModal 
      product={selectedProduct} 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
};

export default ProductDetail;
