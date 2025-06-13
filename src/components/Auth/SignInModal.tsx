import React, { useState } from 'react';
import { X, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../utils/translations';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

type UserRole = 'parent' | 'teacher' | 'schoolAdmin';

// Mock user data for demonstration
const mockUsers = {
  'parent@example.com': { role: 'parent' as UserRole, password: 'password123' },
  'teacher@example.com': { role: 'teacher' as UserRole, password: 'password123' },
  'admin@example.com': { role: 'schoolAdmin' as UserRole, password: 'password123' },
};

export function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const { language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const isValidEmail = (email: string): email is keyof typeof mockUsers => {
    return email in mockUsers;
  };

  const handleSignIn = async (email: string, password: string): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
    console.log('Attempting sign-in with:', { email, password });
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!isValidEmail(email)) {
      console.log('User not found:', email);
      return { success: false, error: getTranslation('userNotFound', language) || 'User not found' };
    }
    
    const user = mockUsers[email];
    if (user.password !== password) {
      console.log('Invalid password for:', email);
      return { success: false, error: getTranslation('invalidPassword', language) || 'Invalid password' };
    }
    
    console.log('Sign-in successful for:', email, 'Role:', user.role);
    return { success: true, role: user.role };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    console.log('Form data on submit:', formData);

    try {
      const result = await handleSignIn(formData.email, formData.password);
      console.log('Sign-in result:', result);
      
      if (result.success && result.role) {
        setSuccess(getTranslation('signInSuccess', language) || 'Sign-in successful!');
        console.log('User signed in successfully:', {
          email: formData.email,
          role: result.role,
          loginTime: new Date().toISOString(),
        });
        
        // Redirect to the appropriate dashboard based on role
        setTimeout(() => {
          switch (result.role) {
            case 'parent':
              navigate('/parent');
              break;
            case 'teacher':
              navigate('/teacher');
              break;
            case 'schoolAdmin':
              navigate('/school');
              break;
          }
          onClose();
          setFormData({ email: '', password: '' });
          setSuccess('');
        }, 2000);
      } else {
        setError(result.error || (getTranslation('signInFailed', language) || 'Sign in failed'));
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      setError(`An error occurred: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="/assets/logo.jpg"
              alt="PedaConnect Logo"
              className="w-10 h-10 object-contain rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">PedaConnect</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getTranslation('heroSlogan', language) || 'Connect with Education'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg text-sm flex items-center space-x-2 rtl:space-x-reverse animate-slide-in" aria-live="polite">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mx-6 mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg text-sm flex items-center space-x-2 rtl:space-x-reverse animate-slide-in" aria-live="polite">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        )}

        <div className="mx-6 mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg text-sm">
          <div className="font-medium mb-2">Demo Credentials:</div>
          <div className="text-xs space-y-1">
            <div>Parent: parent@example.com / password123</div>
            <div>Teacher: teacher@example.com / password123</div>
            <div>Admin: admin@example.com / password123</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {getTranslation('email', language) || 'Email'}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
              placeholder={getTranslation('email', language) || 'Email'}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {getTranslation('password', language) || 'Password'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full px-3 py-2 pr-10 rtl:pr-3 rtl:pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={getTranslation('password', language) || 'Password'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-[#39789b] text-white rounded-lg hover:bg-[#2f6a85] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {getTranslation('loading', language) || 'Loading...'}
              </>
            ) : (
              getTranslation('signIn', language) || 'Sign In'
            )}
          </button>

          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getTranslation('noAccount', language) || "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={onSwitchToSignUp}
                className="text-[#39789b] hover:text-[#2f6a85] font-medium transition-colors"
              >
                {getTranslation('signUp', language) || 'Sign Up'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}