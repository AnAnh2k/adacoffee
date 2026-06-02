import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg('Vui lòng điền đầy đủ tất cả thông tin.');
      toast.error('Vui lòng điền đầy đủ tất cả thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Xác nhận mật khẩu không khớp.');
      toast.error('Xác nhận mật khẩu không khớp.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);

    try {
      await register(name, email, password);
      setSuccessMsg('Đăng ký thành công! Đang chuyển hướng sang trang Đăng nhập...');
      toast.success('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      const msg = err.message || 'Đăng ký không thành công. Vui lòng thử lại.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100 relative overflow-hidden px-4">
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-75"></div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-8 z-10 transition-all duration-300 hover:shadow-2xl">
        {/* Header / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 animate-bounce">
            <i className="fas fa-coffee text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-stone-800">ADA Coffee</h2>
          <p className="text-stone-500 text-sm mt-1">Đăng ký thành viên mới để nhận nhiều ưu đãi hấp dẫn.</p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm flex items-center gap-3">
            <i className="fas fa-exclamation-circle text-base"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success message */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm flex items-center gap-3">
            <i className="fas fa-check-circle text-base"></i>
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block">Họ và tên</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                <i className="far fa-user text-sm"></i>
              </span>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting || !!successMsg}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-800 placeholder-stone-400 text-sm"
                required
              />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                <i className="far fa-envelope text-sm"></i>
              </span>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || !!successMsg}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-800 placeholder-stone-400 text-sm"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block">Mật khẩu</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                <i className="fas fa-lock text-sm"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting || !!successMsg}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-800 placeholder-stone-400 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 focus:outline-none"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
              </button>
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 block">Xác nhận mật khẩu</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-stone-400">
                <i className="fas fa-lock text-sm"></i>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting || !!successMsg}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-stone-800 placeholder-stone-400 text-sm"
                required
              />
            </div>
          </div>

          {/* Terms and conditions checkbox */}
          <div className="flex items-start pt-2">
            <input
              id="terms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 text-primary focus:ring-primary border-stone-300 rounded cursor-pointer"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-xs text-stone-600 select-none cursor-pointer">
              Tôi đồng ý với các Điều khoản dịch vụ và Chính sách bảo mật của ADA Coffee.
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || !!successMsg}
            className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:bg-stone-400 disabled:shadow-none cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý đăng ký...
              </>
            ) : (
              'Đăng ký tài khoản'
            )}
          </button>
        </form>

        {/* Redirect to Login */}
        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-stone-500 text-sm">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline transition-all">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
