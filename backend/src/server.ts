import dotenv from 'dotenv';
import app from './app';
import { initDB } from './lib/prisma';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Khởi tạo Database trước rồi mới bắt đầu lắng nghe cổng mạng
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[server]: Server đang chạy tại http://localhost:${PORT}`);
  });
});
