import React, { useState } from 'react';
import { Plus, Edit, Save, X, Filter, Download } from 'lucide-react';

const GradeManager: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('5أ');
  const [selectedSubject, setSelectedSubject] = useState('الرياضيات');
  const [gradeSystem, setGradeSystem] = useState('20');
  const [showAddModal, setShowAddModal] = useState(false);

  const classes = ['5أ', '4أ', '6أ'];
  const subjects = ['الرياضيات', 'العلوم', 'اللغة العربية'];
  const gradeSystems = ['20', '15', '10'];

  const grades = [
    {
      id: 1,
      studentName: 'أحمد محمد علي',
      grades: {
        'امتحان الفصل الأول': { score: 18, max: 20, date: '2024-01-15' },
        'واجب منزلي 1': { score: 16, max: 20, date: '2024-01-10' },
        'اختبار قصير': { score: 19, max: 20, date: '2024-01-08' }
      },
      average: 17.7
    },
    {
      id: 2,
      studentName: 'فاطمة حسن',
      grades: {
        'امتحان الفصل الأول': { score: 16, max: 20, date: '2024-01-15' },
        'واجب منزلي 1': { score: 18, max: 20, date: '2024-01-10' },
        'اختبار قصير': { score: 17, max: 20, date: '2024-01-08' }
      },
      average: 17.0
    },
    {
      id: 3,
      studentName: 'عمر السعيد',
      grades: {
        'امتحان الفصل الأول': { score: 15, max: 20, date: '2024-01-15' },
        'واجب منزلي 1': { score: 14, max: 20, date: '2024-01-10' },
        'اختبار قصير': { score: 16, max: 20, date: '2024-01-08' }
      },
      average: 15.0
    }
  ];

  const assessmentTypes = ['امتحان', 'واجب منزلي', 'اختبار قصير', 'مشروع', 'مشاركة صفية'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الدرجات</h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>تصدير</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة درجة</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الفصل
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              المادة
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              نظام التقييم
            </label>
            <select
              value={gradeSystem}
              onChange={(e) => setGradeSystem(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {gradeSystems.map((system) => (
                <option key={system} value={system}>/{system}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
              <span>تطبيق الفلتر</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            درجات {selectedClass} - {selectedSubject}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الطالب
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  امتحان الفصل الأول
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  واجب منزلي 1
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  اختبار قصير
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  المعدل
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {grades.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{student.studentName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.grades['امتحان الفصل الأول']?.score || '-'}/{gradeSystem}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.grades['واجب منزلي 1']?.score || '-'}/{gradeSystem}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.grades['اختبار قصير']?.score || '-'}/{gradeSystem}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`text-sm font-bold ${
                      student.average >= 16 ? 'text-green-600' :
                      student.average >= 12 ? 'text-blue-600' :
                      student.average >= 10 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {student.average.toFixed(1)}/{gradeSystem}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mx-1">
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Grade Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">إضافة درجة جديدة</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الطالب
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>اختر الطالب</option>
                  {grades.map((student) => (
                    <option key={student.id} value={student.id}>{student.studentName}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  نوع التقييم
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  {assessmentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    الدرجة
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={gradeSystem}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    من
                  </label>
                  <input
                    type="number"
                    value={gradeSystem}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  التاريخ
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ملاحظات (اختياري)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="ملاحظات إضافية..."
                />
              </div>
            </form>
            
            <div className="flex justify-end space-x-3 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeManager;