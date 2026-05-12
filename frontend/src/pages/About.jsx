import React from 'react';

const About = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="bg-gray-50 py-4 mb-10">
        <div className="container mx-auto px-4">
          <div className="text-xs uppercase tracking-widest flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">Trang chủ</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400 font-bold">Về chúng tôi</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          <div className="w-full lg:w-2/3">
            <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/img/blog/details/blog-details.jpg" 
                alt="About THE SPACE" 
                className="w-full h-auto"
                onError={(e) => { e.target.src = 'https://placehold.co/800x450?text=About+Us'; }}
              />
            </div>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold mb-8 text-gray-900 border-l-8 border-primary pl-6 uppercase">Về chúng tôi</h2>
              
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Bạn là một người yêu thích cà phê và vũ trụ? Bạn muốn tìm một nơi để thư giãn và khám phá những điều kỳ thú của không gian? Hãy đến với <strong>THE SPACE COFFEE</strong>, quán cà phê đầu tiên và duy nhất tại Hà Nội mang phong cách vũ trụ.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                THE SPACE COFFEE được thành lập vào năm 2023, với mong muốn mang đến cho khách hàng những trải nghiệm mới lạ và độc đáo. Quán cà phê nằm tại số 3 phố Cầu Giấy, quận Đống Đa, có không gian rộng rãi và thoáng mát. Thiết kế nội thất của quán cà phê là sự kết hợp hài hòa giữa sự hiện đại và sang trọng.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-gray-500 bg-gray-50 rounded-r-xl">
                "Các bức tường và trần nhà được trang trí bằng những hình ảnh đẹp mắt của các hành tinh, sao và thiên hà, tạo cho bạn cảm giác như đang lạc vào một thế giới khác."
              </blockquote>

              <p className="text-gray-600 leading-relaxed mb-6">
                Điểm nổi bật của THE SPACE COFFEE là những món cà phê đặc biệt, được pha chế từ những hạt cà phê chất lượng cao. Bạn sẽ được thưởng thức những ly cà phê có hình dạng và màu sắc độc đáo, như <strong>Milky Way Latte, Galaxy Frappe hay Starry Night Mocha</strong>.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6 font-semibold">
                THE SPACE COFFEE là một nơi lý tưởng cho bạn tụ tập cùng bạn bè hay làm việc. Quán cà phê có wifi miễn phí, ổ cắm điện và máy in tiện lợi.
              </p>

              <div className="mt-12 p-8 bg-black text-white rounded-3xl text-center">
                <h4 className="text-2xl font-bold mb-2 uppercase">THE SPACE COFFEE</h4>
                <p className="text-primary font-bold tracking-widest uppercase">Cà phê không giới hạn!</p>
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 p-8 rounded-3xl sticky top-28">
              <h5 className="text-sm font-bold uppercase tracking-widest mb-6 border-b-2 border-primary inline-block pb-1">Thông tin liên hệ</h5>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h6 className="text-xs font-bold uppercase text-gray-400 mb-1">Địa chỉ</h6>
                    <p className="text-sm text-gray-700">Số 3 phố Cầu Giấy, quận Đống Đa, Hà Nội</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h6 className="text-xs font-bold uppercase text-gray-400 mb-1">Điện thoại</h6>
                    <p className="text-sm text-gray-700">+84 123 456 789</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h6 className="text-xs font-bold uppercase text-gray-400 mb-1">Giờ mở cửa</h6>
                    <p className="text-sm text-gray-700">07:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-200">
                <h5 className="text-sm font-bold uppercase tracking-widest mb-6">Theo dõi ADA Coffee</h5>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
