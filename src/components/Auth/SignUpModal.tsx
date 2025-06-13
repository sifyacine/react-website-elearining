import React, { useState, useEffect, useMemo } from 'react';
import { X, Eye, EyeOff, Users, School, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../utils/translations';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (role: 'parent' | 'teacher' | 'schoolAdmin') => void;
  onSwitchToSignIn: () => void; // Added prop for switching to sign-in modal
}

type UserRole = 'parent' | 'teacher' | 'schoolAdmin';

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

export function SignUpModal({ isOpen, onClose, onSignInSuccess, onSwitchToSignIn }: SignUpModalProps) {
  const { language, isRTL } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>('parent');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

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
    const loadData = async () => {
      try {
        const wilayaResponse = await fetch('/assets/states_and_communes.json');
        if (!wilayaResponse.ok) throw new Error('Failed to load wilayas');
        const wilayaData: { wilaya_name: string; commune_name: string }[] = await wilayaResponse.json();
        const wilayaMap = wilayaData.reduce((acc: { [key: string]: string[] }, item) => {
          const { wilaya_name, commune_name } = item;
          if (!acc[wilaya_name]) acc[wilaya_name] = [];
          if (!acc[wilaya_name].includes(commune_name)) acc[wilaya_name].push(commune_name);
          return acc;
        }, {});
        const wilayaArray = Object.keys(wilayaMap)
          .map((name) => ({ name, communes: wilayaMap[name].sort() }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setWilayas(wilayaArray);

        const schoolResponse = await fetch('/assets/mock_data.json');
        if (!schoolResponse.ok) throw new Error('Failed to load schools');
        const schoolData: { schools: School[] } = await schoolResponse.json();
        setSchools(schoolData.schools.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        console.error('Error loading data:', err);
        setError(getTranslation('dataLoadError', language) || 'Failed to load data');
        setWilayas([]);
        setSchools([]);
      }
    };

    loadData();
  }, [language]);

  const grades = useMemo(
    () => ({
      primary: [
        { value: '1', label: getTranslation('grade1', language) || 'Grade 1' },
        { value: '2', label: getTranslation('grade2', language) || 'Grade 2' },
        { value: '3', label: getTranslation('grade3', language) || 'Grade 3' },
        { value: '4', label: getTranslation('grade4', language) || 'Grade 4' },
        { value: '5', label: getTranslation('grade5', language) || 'Grade 5' },
      ],
      middle: [
        { value: '1', label: getTranslation('middle1', language) || 'Middle 1' },
        { value: '2', label: getTranslation('middle2', language) || 'Middle 2' },
        { value: '3', label: getTranslation('middle3', language) || 'Middle 3' },
        { value: '4', label: getTranslation('middle4', language) || 'Middle 4' },
      ],
      high: [
        { value: '1', label: getTranslation('high1', language) || 'High 1' },
        { value: '2', label: getTranslation('high2', language) || 'High 2' },
        { value: '3', label: getTranslation('high3', language) || 'High 3' },
      ],
    }),
    [language]
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleChildChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedChildren = prev.children.map((child, i) => {
        if (i !== index) return child;
        const updatedChild = { ...child, [field]: value };
        if (field === 'schoolName') {
          const selectedSchool = schools.find((school) => school.name === value);
          updatedChild.schoolLevel = selectedSchool ? selectedSchool.level : '';
          updatedChild.grade = '';
        }
        return updatedChild;
      });
      return { ...prev, children: updatedChildren };
    });
    setError('');
  };

  const updateChildrenCount = (count: number) => {
    setNumberOfChildren(count);
    const newChildren = Array.from({ length: count }, (_, i) =>
      formData.children[i] || { fullName: '', dateOfBirth: '', schoolName: '', schoolLevel: '', grade: '' }
    );
    setFormData((prev) => ({ ...prev, children: newChildren }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return getTranslation('passwordMismatch', language) || 'Passwords do not match';
    }
    if (!/^\+213[0-9]{9}$/.test(formData.phoneNumber)) {
      return getTranslation('invalidPhone', language) || 'Invalid phone number';
    }
    if (selectedRole === 'parent' && formData.children.some((child) => !child.schoolName || !child.grade)) {
      return getTranslation('incompleteChildData', language) || 'Incomplete child data';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    console.log('Form data on submit:', formData);

    try {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        setIsLoading(false);
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const userData = {
          email: formData.email,
          role: selectedRole,
          loginTime: new Date().toISOString(),
        };
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('pedaConnectUser', JSON.stringify(userData));
          console.log('localStorage set successfully:', userData);
        } else {
          console.warn('localStorage is unavailable, skipping save.');
        }
      } catch (storageError) {
        console.error('localStorage error:', storageError);
      }
      try {
        onSignInSuccess(selectedRole);
        console.log('onSignInSuccess called successfully');
      } catch (callbackError: any) {
        console.error('onSignInSuccess error:', callbackError);
        setError(`Failed to process sign-up: ${callbackError.message || 'Unknown error'}`);
        setIsLoading(false);
        return;
      }
      try {
        onClose();
        console.log('onClose called successfully');
      } catch (closeError: any) {
        console.error('onClose error:', closeError);
        setError(`Failed to close modal: ${closeError.message || 'Unknown error'}`);
        setIsLoading(false);
        return;
      }
    } catch (error: any) {
      console.error('Submit error:', error);
      setError(`An error occurred: ${error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const roleIcons = {
    parent: Users,
    teacher: GraduationCap,
    schoolAdmin: School,
  };

  if (!isOpen) return null;

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
            <X className="text-gray-600 dark:text-white" size={20} />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {getTranslation('selectRole', language) || 'Select Role'}
            </label>
            <div className="grid grid-cols-1 gap-3">
              {(['parent', 'teacher', 'schoolAdmin'] as UserRole[]).map((role) => {
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
                      {getTranslation(role, language) || role}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {getTranslation('username', language) || 'Username'}
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
              placeholder={getTranslation('username', language) || 'Username'}
              required
            />
          </div>

          {(selectedRole === 'parent' || selectedRole === 'teacher') && (
            <div>
              <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                {getTranslation('fullName', language) || 'Full Name'}
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={getTranslation('fullName', language) || 'Full Name'}
                required
              />
            </div>
          )}

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
              {getTranslation('phoneNumber', language) || 'Phone Number'}
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
              {getTranslation('wilaya', language) || 'Wilaya'}
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
              <option value="">{getTranslation('selectWilaya', language) || 'Select Wilaya'}</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.name} value={wilaya.name}>
                  {wilaya.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {getTranslation('commune', language) || 'Commune'}
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
              <option value="">{getTranslation('selectCommune', language) || 'Select Commune'}</option>
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

          <div>
            <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
              {getTranslation('confirmPassword', language) || 'Confirm Password'}
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full px-3 py-2 pr-10 rtl:pr-3 rtl:pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={getTranslation('confirmPassword', language) || 'Confirm Password'}
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

          {selectedRole === 'schoolAdmin' && (
            <>
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('schoolName', language) || 'School Name'}
                </label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={getTranslation('schoolName', language) || 'School Name'}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('schoolType', language) || 'School Type'}
                </label>
                <select
                  value={formData.schoolType}
                  onChange={(e) => handleInputChange('schoolType', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  required
                >
                  <option value="public">{getTranslation('publicSchool', language) || 'Public'}</option>
                  <option value="private">{getTranslation('privateSchool', language) || 'Private'}</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('schoolLevel', language) || 'School Level'}
                </label>
                <select
                  value={formData.schoolLevel}
                  onChange={(e) => handleInputChange('schoolLevel', e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                  required
                >
                  <option value="primary">{getTranslation('primarySchool', language) || 'Primary'}</option>
                  <option value="middle">{getTranslation('middleSchool', language) || 'Middle'}</option>
                  <option value="high">{getTranslation('highSchool', language) || 'High'}</option>
                </select>
              </div>
            </>
          )}

          {selectedRole === 'parent' && (
            <>
              <div>
                <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getTranslation('numberOfChildren', language) || 'Number of Children'}
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
                      {getTranslation('childFullName', language) || 'Child Full Name'}
                    </label>
                    <input
                      type="text"
                      value={child.fullName}
                      onChange={(e) => handleChildChange(index, 'fullName', e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={getTranslation('childFullName', language) || 'Child Full Name'}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {getTranslation('dateOfBirth', language) || 'Date of Birth'}
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
                      {getTranslation('schoolName', language) || 'School Name'}
                    </label>
                    <select
                      value={child.schoolName}
                      onChange={(e) => handleChildChange(index, 'schoolName', e.target.value)}
                      className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                      required
                    >
                      <option value="">{getTranslation('selectSchool', language) || 'Select School'}</option>
                      {schools
                        .filter(
                          (school) =>
                            (!selectedWilaya || school.wilaya_name === selectedWilaya) &&
                            (!selectedCommune || school.commune_name === selectedCommune)
                        )
                        .map((school) => (
                          <option key={school.name} value={school.name}>
                            {school.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {child.schoolName && (
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {getTranslation('grade', language) || 'Grade'}
                      </label>
                      <select
                        value={child.grade}
                        onChange={(e) => handleChildChange(index, 'grade', e.target.value)}
                        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39789b] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}
                        required
                      >
                        <option value="">{getTranslation('selectGrade', language) || 'Select Grade'}</option>
                        {child.schoolLevel &&
                          grades[child.schoolLevel as keyof typeof grades]?.map((grade) => (
                            <option key={grade.value} value={grade.value}>
                              {grade.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-[#39789b] text-white rounded-lg hover:bg-[#2f6a85] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {isLoading
              ? getTranslation('loading', language) || 'Loading...'
              : getTranslation('signUp', language) || 'Sign Up'}
          </button>

          {/* Add link to switch to sign-in modal */}
          <div className={`text-center text-sm text-gray-600 dark:text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>
            {getTranslation('alreadyHaveAccount', language) || 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-[#39789b] hover:underline"
            >
              {getTranslation('signIn', language) || 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}