import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { initDB } from './db';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Địa chỉ client (Frontend)
  credentials: true // Cho phép gửi cookie kèm theo request
}));
app.use(express.json());
app.use(cookieParser());

// Đăng ký API Routes
app.use('/api/auth', authRoutes);

// Route kiểm tra server hoạt động
app.get('/', (req, res) => {
  res.send('Server ADA Coffee đang hoạt động tốt!');
});

// Khởi tạo Database trước rồi mới chạy Server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[server]: Server đang chạy tại http://localhost:${PORT}`);
  });
});
