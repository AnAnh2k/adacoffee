import prisma from '../src/lib/prisma';

async function main() {
  console.log('Bắt đầu dọn dẹp database...');
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log('Bắt đầu seed dữ liệu danh mục...');
  const traditional = await prisma.category.create({
    data: { id: 1, name: 'Cà phê truyền thống', slug: 'ca-phe-truyen-thong' }
  });
  const machine = await prisma.category.create({
    data: { id: 2, name: 'Cà phê máy', slug: 'ca-phe-may' }
  });
  const tea = await prisma.category.create({
    data: { id: 3, name: 'Trà trái cây', slug: 'tra-trai-cay' }
  });
  const blended = await prisma.category.create({
    data: { id: 4, name: 'Đồ uống đá xay', slug: 'do-uong-da-xay' }
  });
  const dessert = await prisma.category.create({
    data: { id: 5, name: 'Bánh & Tráng miệng', slug: 'banh-and-trang-mieng' }
  });

  console.log('Bắt đầu seed dữ liệu sản phẩm...');
  const productsData = [
    { id: 1, categoryId: 1, name: 'Cà phê sữa đá', slug: 'ca-phe-sua-da', price: 29000, image: 'ca-phe-sua-da.jpeg', description: 'Cà phê Robusta đậm chất kết hợp với sữa đặc béo ngậy và đá mát lạnh.' },
    { id: 2, categoryId: 1, name: 'Cà phê đen đá', slug: 'ca-phe-den-da', price: 25000, image: 'ca-phe-den.jpeg', description: 'Cà phê đen nguyên chất mang hương vị đắng thanh nồng nàn.' },
    { id: 3, categoryId: 1, name: 'Bạc xỉu đá', slug: 'bac-xiu-da', price: 32000, image: 'bac-xiu-da.jpeg', description: 'Sự kết hợp ngọt ngào giữa sữa ấm, sữa đặc và một chút cà phê nồng nàn.' },
    { id: 4, categoryId: 2, name: 'Americano đá', slug: 'americano-da', price: 35000, image: 'americano-da.jpeg', description: 'Espresso pha loãng với nước đá mang lại hương vị nhẹ nhàng dễ chịu.' },
    { id: 5, categoryId: 2, name: 'Latte đá', slug: 'latte-da', price: 45000, image: 'latte-da.jpeg', description: 'Sự kết hợp hoàn hảo giữa Espresso đậm đà và sữa tươi béo mịn.' },
    { id: 6, categoryId: 2, name: 'Cappuccino nóng', slug: 'cappuccino-nong', price: 45000, image: 'capucchino-nong.jpeg', description: 'Espresso nóng kết hợp lớp bọt sữa dày mịn trang trí nghệ thuật.' },
    { id: 7, categoryId: 3, name: 'Trà đào cam sả', slug: 'tra-dao-cam-sa', price: 45000, image: 'tra-dao.jpeg', description: 'Trà đào thanh mát kết hợp lát đào tươi cùng hương cam sả nồng ấm.' },
    { id: 8, categoryId: 3, name: 'Trà vải', slug: 'tra-vai', price: 45000, image: 'tra-vai.jpeg', description: 'Trà trái cây mát lạnh thơm lừng vị quả vải chín mọng.' },
    { id: 9, categoryId: 3, name: 'Trà chanh', slug: 'tra-chanh', price: 25000, image: 'tra-chanh.jpeg', description: 'Ly trà chanh giải nhiệt mát rượi thanh mát.' },
    { id: 10, categoryId: 4, name: 'Sinh tố dâu', slug: 'sinh-to-dau', price: 55000, image: 'sinh-to-dau.jpeg', description: 'Sinh tố từ quả dâu tươi chín đỏ thơm ngậy ngọt ngào.' },
    { id: 11, categoryId: 4, name: 'Trà sữa Matcha', slug: 'tra-sua-matcha', price: 49000, image: 'tra-sua-matcha.jpeg', description: 'Bột matcha Nhật Bản nguyên chất hòa cùng trà sữa béo ngậy.' },
    { id: 12, categoryId: 5, name: 'Bánh Flan', slug: 'banh-flan', price: 25000, image: 'banh-flan.jpg', description: 'Bánh flan mềm mịn, thơm béo vị trứng sữa phủ lớp caramen ngọt đắng.' },
    { id: 13, categoryId: 1, name: 'Cà phê sữa nóng', slug: 'ca-phe-sua-nong', price: 29000, image: 'ca-phe-sua-nong.jpeg', description: 'Ly cà phê sữa nóng ấm áp chuẩn vị truyền thống.' },
    { id: 14, categoryId: 2, name: 'Espresso đá', slug: 'espresso-da', price: 30000, image: 'espresso-da.jpeg', description: 'Cà phê Espresso pha máy chiết xuất đậm đặc uống cùng đá.' },
    { id: 15, categoryId: 3, name: 'Hồng trà chanh', slug: 'hong-tra-chanh', price: 35000, image: 'hong-tra-chanh.jpeg', description: 'Hồng trà kết hợp nước cốt chanh tươi mát lạnh thanh khiết.' },
  ];

  for (const product of productsData) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('Seed dữ liệu thành công!');
}

main()
  .catch((e) => {
    console.error('Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
