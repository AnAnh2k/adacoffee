import bcrypt from 'bcryptjs';

// Hàm băm mật khẩu
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Hàm so khớp mật khẩu
export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};
