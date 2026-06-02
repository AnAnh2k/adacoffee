import api from './api';

export const authService = {
  // Đăng nhập
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
    
  // Đăng ký tài khoản
  register: (name: string, email: string, password: string) => 
    api.post('/auth/register', { name, email, password }),
    
  // Đăng xuất
  logout: () => 
    api.post('/auth/logout'),
    
  // Lấy thông tin tài khoản hiện tại
  getMe: () => 
    api.get('/auth/me'),
};
