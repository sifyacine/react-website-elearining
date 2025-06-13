import React, { useState } from 'react';
import { Users, GraduationCap, MessageCircle, Bell, FileText, TrendingUp, Calendar, UserCheck } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StudentManagement from '../../components/school/StudentManagement';
import TeacherManagement from '../../components/school/TeacherManagement';
import AnnouncementManager from '../../components/school/AnnouncementManager';
import AbsenceReviews from '../../components/school/AbsenceReviews';
import GradeOverview from '../../components/school/GradeOverview';

const SchoolDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'إجمالي الطلاب', value: '485', icon: Users, color: 'bg-blue-500' },
    { title: 'المعلمون', value: '24', icon: GraduationCap, color: 'bg-green-500' },
    { title: 'الفصول', value: '18', icon: FileText, color: 'bg-purple-500' },
    { title: 'الحضور اليومي', value: '94%', icon: UserCheck, color: 'bg-orange-500' }
  ];

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: TrendingUp },
    { id: 'students', label: 'الطلاب', icon: Users },
    { id: 'teachers', label: 'المعلمون', icon: GraduationCap },
    { id: 'announcements', label: 'الإعلانات', icon: Bell },
    { id: 'absences', label: 'مراجعة الغياب', icon: Calendar },
    { id: 'grades', label: 'الدرجات', icon: FileText }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'announcements':
        return <AnnouncementManager />;
      case 'absences':
        return <AbsenceReviews />;
      case 'grades':
        return <GradeOverview />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">الأنشطة الأخيرة</h3>
                <div className="space-y-4">
                  {[
                    { action: 'تم تسجيل طالب جديد', name: 'أحمد محمد', time: 'منذ ساعة' },
                    { action: 'طلب إجازة مرسل', name: 'الأستاذة فاطمة', time: 'منذ 2 ساعة' },
                    { action: 'إعلان جديد', name: 'امتحانات الفصل الأول', time: 'منذ 3 ساعات' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{activity.name}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">الإحصائيات الشهرية</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">طلاب جدد</span>
                    <span className="text-sm font-semibold text-green-600">+12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">معدل الحضور</span>
                    <span className="text-sm font-semibold text-blue-600">94.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">الإعلانات المنشورة</span>
                    <span className="text-sm font-semibold text-purple-600">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">طلبات الغياب المراجعة</span>
                    <span className="text-sm font-semibold text-orange-600">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      title="لوحة تحكم المدرسة"
      subtitle="مرحباً بك في نظام إدارة مدرسة الأمل الابتدائية"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default SchoolDashboard;