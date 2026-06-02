interface Blog {
  id: number;
  title: string;
  date: string;
  author: string;
  img: string;
  desc: string;
}

const News = () => {
  const blogs: Blog[] = [
    { id: 1, title: 'CÀ PHÊ KHÔNG GIỚI HẠN - TRẢI NGHIỆM MỚI TẠI ADA COFFEE', date: '20/05/2024', author: 'Đức Anh', img: 'tt00001.jpg', desc: 'Hãy đến với ADA COFFEE, quán cà phê đầu tiên và duy nhất tại Hà Nội mang phong cách vũ trụ...' },
    { id: 2, title: 'KHÔNG GIAN VŨ TRỤ GIỮA LÒNG HÀ NỘI', date: '18/05/2024', author: 'Admin', img: 'tt00002.jpg', desc: 'Thiết kế nội thất của quán cà phê là sự kết hợp hài hòa giữa sự hiện đại và sang trọng. Các bức tường và trần nhà được trang trí bằng những hình ảnh đẹp mắt...' },
    { id: 3, title: 'CÁC MÓN ĐỒ UỐNG ĐẶC BIỆT TẠI ADA COFFEE', date: '15/05/2024', author: 'Team ADA', img: 'tt00003.jpg', desc: 'Bạn sẽ được thưởng thức những ly cà phê có hình dạng và màu sắc độc đáo, như Milky Way Latte, Galaxy Frappe hay Starry Night Mocha...' },
    { id: 4, title: 'WORKSHOP VỀ KHÔNG GIAN VÀ VŨ TRỤ', date: '12/05/2024', author: 'Sự kiện', img: 'tt00004.jpg', desc: 'Bạn cũng có thể tham gia vào các hoạt động vui nhộn và bổ ích tại ADA COFFEE, như xem phim về vũ trụ, chơi trò chơi giải đố...' },
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="bg-gray-50 py-4 mb-10">
        <div className="container mx-auto px-4">
          <div className="text-xs uppercase tracking-widest flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">Trang chủ</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400 font-bold">Tin tức</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Blog List */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogs.map((blog) => (
              <div key={blog.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-video mb-6 rounded-2xl shadow-sm">
                  <img 
                    src={`/img/news/${blog.img}`} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450?text=Tin+tức'; }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-3 uppercase tracking-widest font-bold">
                    <span>{blog.date}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight uppercase">
                    {blog.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">
                    {blog.desc}
                  </p>
                  <a href="#" className="text-xs font-bold uppercase border-b-2 border-primary pb-1 hover:text-primary transition-colors inline-block">Xem chi tiết</a>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="mb-12">
              <h5 className="text-sm font-bold uppercase tracking-widest mb-8 border-b-2 border-primary inline-block pb-1">Tìm kiếm</h5>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Nhập từ khóa..." 
                  className="w-full h-12 px-5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-bold uppercase tracking-widest mb-8 border-b-2 border-primary inline-block pb-1">Tin mới nhất</h5>
              <div className="space-y-6">
                {blogs.slice(0, 3).map((blog) => (
                  <div key={blog.id} className="flex gap-4 group cursor-pointer">
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <img src={`/img/news/${blog.img}`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h6 className="text-xs font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 uppercase">{blog.title}</h6>
                      <div className="text-[10px] text-gray-400 mt-1">{blog.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
