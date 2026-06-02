import React, { createContext, useContext, useState, useEffect } from "react";
import api, { setAccessToken } from "../services/api";
import toast from "react-hot-toast";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Hàm khôi phục phiên đăng nhập khi load trang
  const checkAuth = async () => {
    try {
      // Gọi API /me, interceptor sẽ tự động refresh token nếu cần
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      // Lỗi xảy ra khi chưa đăng nhập hoặc Refresh Token hết hạn
      setUser(null);
      setAccessToken("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // Lắng nghe sự kiện token hết hạn
    const handleAuthExpired = () => {
      setUser(null);
      setAccessToken("");
    };

    window.addEventListener("auth-expired", handleAuthExpired);
    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);

  // Đăng nhập
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, user: userData } = response.data;
      setAccessToken(accessToken);
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  // Đăng ký
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await api.post("/auth/register", { name, email, password });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Đăng ký thất bại.");
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất
  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    } finally {
      setUser(null);
      setAccessToken("");
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};
