import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Filter } from 'lucide-react';

const GradeOverview: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const classes = ['الكل', '3أ', '3ب', '4أ', '4ب', '5أ', '5ب', '6أ', '6ب'];
  const subjects = ['الكل', 'الرياضيات', 'اللغة العربية', 'العلوم', 'التاريخ', 'الجغرافيا'];

  const gradeStats = [
    { label: 'متوسط المدرسة', value: '16.2/20', color: 'bg-blue-500', trend: '+0.3' },
    { label: 'أعلى معدل', value: '19.5/20', color: 'bg-green-500', trend: '+0.5' },
    { label: 'أقل معدل', value: '12.1/20', color: 'bg-red-500', trend: '-0.2' },
    { label: 'معدل النجاح', value: '94%', color: 'bg-purple-500', trend: '+2%' }
  ];

  const classPerformance = [
    { class: '3أ', average: '16.8', students: 28, topStudent: 'أحمد محمد', topGrade: '19.2' },
    { class: '3ب', average: '15.9', students: 26, topStudent: 'فاطمة علي', topGrade: '18.8' },
    { class: '4أ', average: '16.5', students: 30, topStudent: 'عمر حسن', topGrade: '19.5' },
    { class: '4ب', average: '15.7', students: 29, topStudent: 'زينب أحمد', topGrade: '18.9' },
    { class: '5أ', average: '16.9', students: 32, topStudent: 'محمد السعيد', topGrade: '19.1' },
    { class: '5ب', average: '16.1', students: 31, topStudent: 'سارة محمد', topGrade: '18.7' },
    { class: '6أ', average: '17.2', students: 28, topStudent: 'يوسف علي', topGrade: '19.8' },
    { class: '6ب', average: '16.4', students: 27, topStudent: 'نور الدين', topGrade: '19.0' }
  ];

  const subjectPerformance = [
    { subject: 'الرياضيات', average: '15.8', difficulty: 'صعب', improvement: '+0.4' },
    { subject: 'اللغة العربية', average: '16.9', difficulty: 'متوسط', improvement: '+0.2' },
    { subject: 'العلوم', average: '16.2', difficulty: 'متوسط', improvement: '+0.6' },
    { subject: 'التاريخ', average: '17.1', difficulty: 'سهل', improvement: '+0.1' },
    { subject: 'الجغرافيا', average: '16.5', difficulty: 'متوسط', improvement: '+0.3' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">نظرة عامة على الدرجات</h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {classes.map((cls) => (
              <option key={cls} value={cls === 'الكل' ? 'all' : cls}>
                {cls}
              </option>
            ))}
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject === 'الكل' ? 'all' : subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gradeStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">{stat.trend}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Class Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">أداء الفصول</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الفصل
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  المتوسط
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  عدد الطلاب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  أفضل طالب
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  أعلى درجة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {classPerformance.map((cls, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {cls.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{cls.average}/20</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {cls.students} طالب
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {cls.topStudent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {cls.topGrade}/20
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">أداء المواد</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectPerformance.map((subject, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{subject.subject}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  subject.difficulty === 'صعب' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                  subject.difficulty === 'متوسط' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                  'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                }`}>
                  {subject.difficulty}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">{subject.average}/20</span>
                <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  <span>{subject.improvement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeOverview;