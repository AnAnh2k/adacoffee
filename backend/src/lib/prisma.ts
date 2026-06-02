import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Khởi tạo Pool kết nối tới PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Bắt buộc khi kết nối tới Neon.tech qua SSL
  }
});

// Tạo Prisma Adapter
const adapter = new PrismaPg(pool);

// Khởi tạo PrismaClient sử dụng adapter
const prisma = new PrismaClient({ adapter });

// Hàm khởi tạo để kiểm tra kết nối
export const initDB = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('[database]: Kết nối thành công tới PostgreSQL (Neon.tech) qua Prisma ORM');
  } catch (error) {
    console.error('[database]: Lỗi kết nối cơ sở dữ liệu qua Prisma:', error);
    process.exit(1);
  }
};

export default prisma;
