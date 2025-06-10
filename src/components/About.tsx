import React from 'react';
import { Target, Eye, Award, Users, BookOpen, MessageCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../utils/translations';

export function About() {
  const { language, isRTL } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      title: language === 'ar' ? 'تعليم متطور' : language === 'fr' ? 'Éducation Avancée' : 'Advanced Education',
      description: language === 'ar' ? 'منصة تعليمية حديثة تواكب أحدث التطورات التكنولوجية' : language === 'fr' ? 'Plateforme éducative moderne suivant les dernières évolutions technologiques' : 'Modern educational platform following the latest technological developments'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'تواصل فعال' : language === 'fr' ? 'Communication Efficace' : 'Effective Communication',
      description: language === 'ar' ? 'ربط مباشر بين المدارس والمعلمين وأولياء الأمور' : language === 'fr' ? 'Connexion directe entre écoles, enseignants et parents' : 'Direct connection between schools, teachers and parents'
    },
    {
      icon: MessageCircle,
      title: language === 'ar' ? 'شفافية كاملة' : language === 'fr' ? 'Transparence Totale' : 'Complete Transparency',
      description: language === 'ar' ? 'متابعة شاملة ومفصلة لأداء الطلاب الأكاديمي' : language === 'fr' ? 'Suivi complet et détaillé des performances académiques des élèves' : 'Comprehensive and detailed tracking of student academic performance'
    },
    {
      icon: Award,
      title: language === 'ar' ? 'نتائج مضمونة' : language === 'fr' ? 'Résultats Garantis' : 'Guaranteed Results',
      description: language === 'ar' ? 'تحسين ملحوظ في الأداء الأكاديمي ومشاركة أولياء الأمور' : language === 'fr' ? 'Amélioration notable des performances académiques et de l\'engagement des parents' : 'Notable improvement in academic performance and parent engagement'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {getTranslation('aboutTitle', language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {getTranslation('aboutDescription', language)}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className={`bg-gradient-to-br from-[#39789b]/5 to-[#bcc6d2]/10 rounded-2xl p-8 border border-[#bcc6d2]/20 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#39789b] rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {getTranslation('mission', language)}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {getTranslation('missionText', language)}
            </p>
          </div>

          <div className={`bg-gradient-to-br from-[#bcc6d2]/5 to-[#39789b]/10 rounded-2xl p-8 border border-[#bcc6d2]/20 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#39789b] rounded-xl flex items-center justify-center mr-4 rtl:mr-0 rtl:ml-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {getTranslation('vision', language)}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {getTranslation('visionText', language)}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[#bcc6d2]/20 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#39789b] to-[#2d5f7d] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-[#39789b] to-[#2d5f7d] rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">
                {language === 'ar' ? 'مدرسة مسجلة' : language === 'fr' ? 'Écoles Inscrites' : 'Registered Schools'}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">
                {language === 'ar' ? 'ولي أمر نشط' : language === 'fr' ? 'Parents Actifs' : 'Active Parents'}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">2K+</div>
              <div className="text-blue-100">
                {language === 'ar' ? 'معلم متصل' : language === 'fr' ? 'Enseignants Connectés' : 'Connected Teachers'}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">
                {language === 'ar' ? 'رضا المستخدمين' : language === 'fr' ? 'Satisfaction Utilisateurs' : 'User Satisfaction'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}