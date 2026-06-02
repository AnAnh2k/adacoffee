import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';

const app = express();

// Cấu hình Middleware toàn cục
app.use(cors({
  origin: 'http://localhost:5173', // Địa chỉ client (Frontend)
  credentials: true // Cho phép gửi cookie kèm theo request
}));
app.use(express.json());
app.use(cookieParser());

// Đăng ký các API Routes tại tiền tố /api
app.use('/api', routes);

// Route kiểm tra sức khỏe của server
app.get('/', (req, res) => {
  res.send('Server ADA Coffee đang hoạt động tốt!');
});

export default app;
