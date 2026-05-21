import React from "react";

const About = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="py-4 mb-10 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase">
            <a href="/" className="transition-colors hover:text-primary">
              Trang chủ
            </a>
            <span className="text-gray-400">/</span>
            <span className="font-bold text-gray-400">Về chúng tôi</span>
          </div>
        </div>
      </div>

      <div className="container max-w-5xl px-4 mx-auto">
        <div className="flex flex-col gap-16 mb-24 lg:flex-row">
          <div className="w-full lg:w-2/3">
            <div className="mb-10 overflow-hidden shadow-2xl rounded-3xl">
              <img
                src="/img/blog/details/blog-details.jpg"
                alt="About ADA COFFEE"
                className="w-full h-auto"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/800x450?text=About+Us";
                }}
              />
            </div>
            <div className="prose prose-lg max-w-none">
              <h2 className="pl-6 mb-8 text-4xl font-bold text-gray-900 uppercase border-l-8 border-primary">
                Về chúng tôi
              </h2>

              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                Bạn là một người yêu thích cà phê và vũ trụ? Bạn muốn tìm một
                nơi để thư giãn và khám phá những điều kỳ thú của không gian?
                Hãy đến với <strong>ADA COFFEE</strong>, quán cà phê đầu tiên và
                duy nhất tại Hà Nội mang phong cách vũ trụ.
              </p>

              <p className="mb-6 leading-relaxed text-gray-600">
                ADA COFFEE được thành lập vào năm 2023, với mong muốn mang đến
                cho khách hàng những trải nghiệm mới lạ và độc đáo. Quán cà phê
                nằm tại số 3 phố Cầu Giấy, quận Đống Đa, có không gian rộng rãi
                và thoáng mát. Thiết kế nội thất của quán cà phê là sự kết hợp
                hài hòa giữa sự hiện đại và sang trọng.
              </p>

              <blockquote className="py-2 pl-6 my-8 text-xl italic text-gray-500 border-l-4 border-primary bg-gray-50 rounded-r-xl">
                "Các bức tường và trần nhà được trang trí bằng những hình ảnh
                đẹp mắt của các hành tinh, sao và thiên hà, tạo cho bạn cảm giác
                như đang lạc vào một thế giới khác."
              </blockquote>

              <p className="mb-6 leading-relaxed text-gray-600">
                Điểm nổi bật của ADA COFFEE là những món cà phê đặc biệt, được
                pha chế từ những hạt cà phê chất lượng cao. Bạn sẽ được thưởng
                thức những ly cà phê có hình dạng và màu sắc độc đáo, như{" "}
                <strong>
                  Milky Way Latte, Galaxy Frappe hay Starry Night Mocha
                </strong>
                .
              </p>

              <p className="mb-6 font-semibold leading-relaxed text-gray-600">
                ADA COFFEE là một nơi lý tưởng cho bạn tụ tập cùng bạn bè hay
                làm việc. Quán cà phê có wifi miễn phí, ổ cắm điện và máy in
                tiện lợi.
              </p>

              <div className="p-8 mt-12 text-center text-white bg-black rounded-3xl">
                <h4 className="mb-2 text-2xl font-bold uppercase">
                  ADA COFFEE
                </h4>
                <p className="font-bold tracking-widest uppercase text-primary">
                  Cà phê không giới hạn!
                </p>
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky p-8 bg-gray-50 rounded-3xl top-28">
              <h5 className="inline-block pb-1 mb-6 text-sm font-bold tracking-widest uppercase border-b-2 border-primary">
                Thông tin liên hệ
              </h5>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-sm text-primary">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-xs font-bold text-gray-400 uppercase">
                      Địa chỉ
                    </h6>
                    <p className="text-sm text-gray-700">
                      96 Định Công, Hà Nội
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-sm text-primary">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-xs font-bold text-gray-400 uppercase">
                      Điện thoại
                    </h6>
                    <p className="text-sm text-gray-700">+84 888 888 888</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-full shadow-sm text-primary">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h6 className="mb-1 text-xs font-bold text-gray-400 uppercase">
                      Giờ mở cửa
                    </h6>
                    <p className="text-sm text-gray-700">07:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-10 mt-10 border-t border-gray-200">
                <h5 className="mb-6 text-sm font-bold tracking-widest uppercase">
                  Theo dõi ADA Coffee
                </h5>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 text-gray-400 transition-all bg-white rounded-full shadow-sm hover:bg-primary hover:text-white"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 text-gray-400 transition-all bg-white rounded-full shadow-sm hover:bg-primary hover:text-white"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 text-gray-400 transition-all bg-white rounded-full shadow-sm hover:bg-primary hover:text-white"
                  >
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
