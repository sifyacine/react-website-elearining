import React from 'react';
import { ArrowRight, ArrowLeft, Play, BookOpen, Users, Trophy } from 'lucide-react';

import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';

export function Hero() {
  const { language, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#edeff3] to-[#bcc6d2] dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#39789b]/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#bcc6d2]/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-[#39789b]/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-[#bcc6d2]/25 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-[#39789b]/10 dark:bg-[#39789b]/20 rounded-full">
                <Trophy className="w-4 h-4 text-[#39789b] mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="text-sm font-medium text-[#39789b] dark:text-blue-300">
                  {getTranslation('heroSlogan', language)}
                </span>
              </div>

              {/* Main Title */}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="text-gray-900 dark:text-white">
                  {language === 'ar' ? 'PedaConnect' : 'PedaConnect'}
                </span>
                <br />
                <span className="text-[#39789b] dark:text-blue-300">
                  {language === 'ar' ? 'منصة إدارة المدارس' : 'School Management'}
                </span>
                <br />
                <span className="text-gray-700 dark:text-gray-300 text-3xl md:text-4xl lg:text-5xl">
                  {language === 'ar' ? 'الشاملة' : 'Platform'}
                </span>
              </h1>

              {/* Description */}
              <p className={`text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
                {getTranslation('heroDescription', language)}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:justify-end' : 'sm:justify-start'}`}>
              <button className="group flex items-center justify-center px-8 py-4 bg-[#39789b] hover:bg-[#2d5f7d] text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span className="mr-2 rtl:mr-0 rtl:ml-2">{getTranslation('getStarted', language)}</span>
                <ArrowIcon className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
              
              <button className="group flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-[#bcc6d2] dark:border-gray-700 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                <Play className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 text-[#39789b] group-hover:scale-110 transition-transform" />
                <span>{getTranslation('learnMore', language)}</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl md:text-3xl font-bold text-[#39789b] dark:text-blue-300">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'مدرسة' : language === 'fr' ? 'Écoles' : 'Schools'}
                </div>
              </div>
              <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl md:text-3xl font-bold text-[#39789b] dark:text-blue-300">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'ولي أمر' : language === 'fr' ? 'Parents' : 'Parents'}
                </div>
              </div>
              <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="text-2xl md:text-3xl font-bold text-[#39789b] dark:text-blue-300">2K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'معلم' : language === 'fr' ? 'Enseignants' : 'Teachers'}
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'} relative`}>
            <div className="relative">
              {/* Main Illustration */}
              <div className="relative bg-gradient-to-br from-[#39789b] to-[#2d5f7d] rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {/* Dashboard Cards */}
                  <div className="bg-white/90 rounded-xl p-4 shadow-lg">
                    <BookOpen className="w-8 h-8 text-[#39789b] mb-2" />
                    <div className="h-2 bg-[#edeff3] rounded mb-2"></div>
                    <div className="h-2 bg-[#bcc6d2] rounded w-3/4"></div>
                  </div>
                  
                  <div className="bg-white/90 rounded-xl p-4 shadow-lg">
                    <Users className="w-8 h-8 text-[#39789b] mb-2" />
                    <div className="h-2 bg-[#edeff3] rounded mb-2"></div>
                    <div className="h-2 bg-[#bcc6d2] rounded w-2/3"></div>
                  </div>
                  
                  <div className="bg-white/90 rounded-xl p-4 shadow-lg col-span-2">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-6 h-6 bg-[#39789b] rounded-full"></div>
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-[#bcc6d2] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#bcc6d2] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#39789b] rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-[#edeff3] rounded"></div>
                      <div className="h-2 bg-[#bcc6d2] rounded w-4/5"></div>
                      <div className="h-2 bg-[#edeff3] rounded w-3/5"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Trophy className="w-8 h-8 text-[#39789b]" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-[#39789b]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}