import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
        <div className="relative flex items-center justify-center mb-4">
          {/* Vòng xoay loading */}
          <div className="w-16 h-16 border-4 border-stone-200 border-t-primary rounded-full animate-spin"></div>
          {/* Icon hạt cà phê hoặc ly cà phê ở giữa */}
          <i className="fas fa-coffee text-primary text-xl absolute"></i>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 animate-pulse">
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-montserrat">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
