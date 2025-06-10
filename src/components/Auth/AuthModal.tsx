import React, { useState, useEffect, useMemo } from 'react';
import { X, Eye, EyeOff, Users, School } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../utils/translations';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'signin' | 'signup';
type UserRole = 'parent' | 'schoolAdmin';

interface Child {
  fullName: string;
  dateOfBirth: string;
  schoolName: string;
  schoolLevel: string;
  grade: string;
}

interface Wilaya {
  name: string;
  communes: string[];
}

interface School {
  name: string;
  type: string;
  level: string;
  wilaya_name: string;
  commune_name: string;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { language, isRTL } = useLanguage();
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('parent');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    schoolName: '',
    schoolType: 'public',
    schoolLevel: 'primary',
    wilaya: '',
    commune: '',
    children: [{ fullName: '', dateOfBirth: '', schoolName: '', schoolLevel: '', grade: '' }],
  });

  useEffect(() => {
    // Load wilayas and communes
    fetch('/assets/states_and_communes.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load wilayas');
        return response.json();
      })
      .then((data: { wilaya_name: string; commune_name: string }[]) => {
        const wilayaMap = data.reduce((acc: { [key: string]: string[] }, item) => {
          const { wilaya_name, commune_name } = item;
          if (!acc[wilaya_name]) acc[wilaya_name] = [];
          if (!acc[wilaya_name].includes(commune_name)) acc[wilaya_name].push(commune_name);
          return acc;
        }, {});
        const wilayaArray = Object.keys(wilayaMap)
          .map((name) => ({ name, communes: wilayaMap[name].sort() }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setWilayas(wilayaArray);
      })
      .catch((err) => {
        console.error('Error loading wilayas:', err);
        setError(getTranslation('dataLoadError', language));
      });

    // Load schools
    fetch('/assets/mock_data.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load schools');
        return response.json();
      })
      .then((data: { schools: School[] }) => {
        setSchools(data.schools.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((err) => {
        console.error('Error loading schools:', err);
        setError(getTranslation('dataLoadError', language));
      });
  }, [language]);

  const grades = useMemo(
    () => ({
      primary: [
        { value: '1', label: getTranslation('grade1', language) },
        { value: '2', label: getTranslation('grade2', language) },
        { value: '3', label: getTranslation('grade3', language) },
        { value: '4', label: getTranslation('grade4', language) },
        { value: '5', label: getTranslation('grade5', language) },
      ],
      middle: [
        { value: '1', label: getTranslation('middle1', language) },
        { value: '2', label: getTranslation('middle2', language) },
        { value: '3', label: getTranslation('middle3', language) },
        { value: '4', label: getTranslation('middle4', language) },
      ],
      high: [
        { value: '1', label: getTranslation('high1', language) },
        { value: '2', label: getTranslation('high2', language) },
        { value: '3', label: getTranslation('high3', language) },
      ],
    }),
    [language]
  );

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleChildChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedChildren = prev.children.map((child, i) => {
        if (i !== index) return child;
        const updatedChild = { ...child, [field]: value };
        if (field === 'schoolName') {
          const selectedSchool = schools.find((school) => school.name === value);
          updatedChild.schoolLevel = selectedSchool ? selectedSchool.level : '';
          updatedChild.grade = ''; // Reset grade when school changes
        }
        return updatedChild;
      });
      return { ...prev, children: updatedChildren };
    });
    setError(null);
  };

  const updateChildrenCount = (count: number) => {
    setNumberOfChildren(count);
    const newChildren = Array.from({ length: count }, (_, i) =>
      formData.children[i] || { fullName: '', dateOfBirth: '', schoolName: '', schoolLevel: '', grade: '' }
    );
    setFormData((prev) => ({ ...prev, children: newChildren }));
  };

  const validateForm = () => {
    if (authMode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        return getTranslation('passwordMismatch', language);
      }
      if (!/^\+213[0-9]{9}$/.test(formData.phoneNumber)) {
        return getTranslation('invalidPhone', language);
      }
      if (selectedRole === 'parent' && formData.children.some((child) => !child.schoolName || !child.grade)) {
        return getTranslation('incompleteChildData', language);
      }
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    console.log('Auth submission:', { authMode, selectedRole, formData });
    onClose();
  };

  const roleIcons = {
    parent: Users,
    schoolAdmin: School,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
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
                {getTranslation('heroSlogan', language)}
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

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Auth Mode Toggle */}
        <div className="p-6 pb-0">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setAuthMode('signin')}
              className="flex `flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${authMode === 'signin' ? 'bg-white dark:bg-gray-700 text-[#39789b] shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`"
            >
              {getTranslation('signIn', language)}
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                authMode === 'signup'
                  ? 'bg-white dark:bg-gray-700 text-[#39789b] shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {getTranslation('signUp', language)}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role Selection (Sign Up Only) */}
          {authMode === 'signup' && (
            <div>
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {getTranslation('selectRole', language)}
              </label>
              <div className="grid grid-cols-1 gap-3">
                {(['parent', 'schoolAdmin'] as UserRole[]).map((role) => {
                  const Icon = roleIcons[role];
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`flex items-center space-x-3 rtl:space-x-reverse p-3 border-2 rounded-lg transition-all ${
                        selectedRole === role
                          ? 'border-[#39789b] bg-[#39789b]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#39789b]/50'
                      } ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      <Icon className="w-5 h-5 text-[#39789b]" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {getTranslation(role, language)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Common Fields */}
          {authMode === 'signup' && (
            <>
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('username', language)}
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={getTranslation('username', language)}
                  required
                />
              </div>

              {selectedRole === 'parent' && (
                <div>
                  <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {getTranslation('fullName', language)}
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={getTranslation('fullName', language)}
                    required
                  />
                </div>
              )}

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('email', language)}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={getTranslation('email', language)}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('phoneNumber', language)}
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder="+213 551 123 456"
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('wilaya', language)}
                </label>
                <select
                  value={selectedWilaya}
                  onChange={(e) => {
                    setSelectedWilaya(e.target.value);
                    setSelectedCommune('');
                    handleInputChange('wilaya', e.target.value);
                    handleInputChange('commune', '');
                  }}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  required
                >
                  <option value="">{getTranslation('selectWilaya', language)}</option>
                  {wilayas.map((wilaya) => (
                    <option key={wilaya.name} value={wilaya.name}>
                      {wilaya.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('commune', language)}
                </label>
                <select
                  value={selectedCommune}
                  onChange={(e) => {
                    setSelectedCommune(e.target.value);
                    handleInputChange('commune', e.target.value);
                  }}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  required
                  disabled={!selectedWilaya}
                >
                  <option value="">{getTranslation('selectCommune', language)}</option>
                  {selectedWilaya &&
                    wilayas
                      .find((wilaya) => wilaya.name === selectedWilaya)
                      ?.communes.map((commune) => (
                        <option key={commune} value={commune}>
                          {commune}
                        </option>
                      ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('password', language)}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-3 py-2 pr-10 rtl:pr-3 rtl:pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={getTranslation('password', language)}
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

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('confirmPassword', language)}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-3 py-2 pr-10 rtl:pr-3 rtl:pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={getTranslation('confirmPassword', language)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* School Admin Specific Fields */}
          {authMode === 'signup' && selectedRole === 'schoolAdmin' && (
            <>
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('schoolName', language)}
                </label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={getTranslation('schoolName', language)}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('schoolType', language)}
                </label>
                <select
                  value={formData.schoolType}
                  onChange={(e) => handleInputChange('schoolType', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  required
                >
                  <option value="public">{getTranslation('publicSchool', language)}</option>
                  <option value="private">{getTranslation('privateSchool', language)}</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('schoolLevel', language)}
                </label>
                <select
                  value={formData.schoolLevel}
                  onChange={(e) => handleInputChange('schoolLevel', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  required
                >
                  <option value="primary">{getTranslation('primarySchool', language)}</option>
                  <option value="middle">{getTranslation('middleSchool', language)}</option>
                  <option value="high">{getTranslation('highSchool', language)}</option>
                </select>
              </div>
            </>
          )}

          {/* Parent Specific Fields */}
          {authMode === 'signup' && selectedRole === 'parent' && (
            <>
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('numberOfChildren', language)}
                </label>
                <select
                  value={numberOfChildren}
                  onChange={(e) => updateChildrenCount(parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  required
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {formData.children.map((child, index) => (
                <div key={index} className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className={`font-medium text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                    {language === 'ar' ? `الطفل ${index + 1}` : language === 'fr' ? `Enfant ${index + 1}` : `Child ${index + 1}`}
                  </h4>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getTranslation('childFullName', language)}
                    </label>
                    <input
                      type="text"
                      value={child.fullName}
                      onChange={(e) => handleChildChange(index, 'fullName', e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={getTranslation('childFullName', language)}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getTranslation('dateOfBirth', language)}
                    </label>
                    <input
                      type="date"
                      value={child.dateOfBirth}
                      onChange={(e) => handleChildChange(index, 'dateOfBirth', e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getTranslation('selectSchool', language)}
                    </label>
                    <select
                      value={child.schoolName}
                      onChange={(e) => handleChildChange(index, 'schoolName', e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                      required
                    >
                      <option value="">{getTranslation('selectSchool', language)}</option>
                      {schools.map((school) => (
                        <option key={school.name} value={school.name}>
                          {getTranslation(school.name.replace(/\s+/g, ''), language) || school.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getTranslation('childGrade', language)}
                    </label>
                    <select
                      value={child.grade}
                      onChange={(e) => handleChildChange(index, 'grade', e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                      required
                      disabled={!child.schoolLevel}
                    >
                      <option value="">{getTranslation('selectGrade', language)}</option>
                      {child.schoolLevel &&
                        grades[child.schoolLevel as keyof typeof grades]?.map((grade) => (
                          <option key={grade.value} value={grade.value}>
                            {grade.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Sign-In Fields */}
          {authMode === 'signin' && (
            <>
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('email', language)}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={getTranslation('email', language)}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('password', language)}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-3 py-2 pr-10 rtl:pr-3 rtl:pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={getTranslation('password', language)}
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

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#39789b] border-gray-300 rounded focus:ring-2 focus:ring-[#39789b]"
                  />
                  <span className="text-gray-600 dark:text-gray-400">
                    {getTranslation('rememberMe', language)}
                  </span>
                </label>
                <button
                  type="button"
                  className="text-[#39789b] hover:text-[#2d5f7d] dark:hover:text-[#4b8ab0] transition-colors"
                >
                  {getTranslation('forgotPassword', language)}
                </button>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#39789b] hover:bg-[#2d5f7d] text-white rounded-lg font-semibold transition-all duration-200 shadow-sm focus:ring-2 focus:ring-[#39789b] focus:ring-offset-2"
          >
            {authMode === 'signin' ? getTranslation('signIn', language) : getTranslation('signUp', language)}
          </button>

          {/* Switch Mode */}
          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {authMode === 'signin'
                ? getTranslation('dontHaveAccount', language)
                : getTranslation('alreadyHaveAccount', language)}
            </span>
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
              className="ml-1 text-[#39789b] hover:text-[#2d5f7d] dark:hover:text-[#4b8ab0] font-medium transition-colors"
            >
              {authMode === 'signin' ? getTranslation('signUp', language) : getTranslation('signIn', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;