import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
        <div className="w-12 h-12 border-4 border-stone-200 border-t-primary rounded-full animate-spin mb-4"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Chuyển hướng người dùng về trang Đăng nhập và lưu lại đường dẫn hiện tại
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
