import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Khởi tạo Pool kết nối tới PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Bắt buộc khi kết nối tới Neon.tech qua SSL
  }
});

// Hàm khởi tạo các bảng cơ sở dữ liệu
export const initDB = async () => {
  try {
    const client = await pool.connect();
    console.log('[database]: Kết nối thành công tới PostgreSQL (Neon.tech)');
    
    // Tạo bảng users nếu chưa tồn tại
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    await client.query(createUsersTableQuery);
    console.log('[database]: Đã kiểm tra và khởi tạo bảng "users"');
    client.release();
  } catch (error) {
    console.error('[database]: Lỗi kết nối hoặc khởi tạo cơ sở dữ liệu:', error);
    process.exit(1); // Dừng server nếu không kết nối được database
  }
};

export default pool;
