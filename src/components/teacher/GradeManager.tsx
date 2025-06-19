import React, { useState } from 'react';
import { Plus, Edit, Save, X, Filter, Download } from 'lucide-react';

const GradeManager: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('5أ');
  const [selectedSubject, setSelectedSubject] = useState('الرياضيات');
  const [gradeSystem, setGradeSystem] = useState('20');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGrade, setNewGrade] = useState({
    studentId: '',
    assessmentType: '',
    score: '',
    date: '',
    note: '',
    module: '',
  });
  const [grades, setGrades] = useState([
    {
      id: 1,
      studentName: 'أحمد محمد علي',
      grades: {
        'امتحان الفصل الأول': {
          score: 18,
          max: 20,
          date: '2024-01-15',
          note: 'أظهر أحمد تفوقًا في حل المسائل الرياضية، لكنه يحتاج إلى التركيز أكثر أثناء الشرح.',
          module: 'الكسور',
        },
        'واجب منزلي 1': {
          score: 16,
          max: 20,
          date: '2024-01-10',
          note: 'عمل جيد، ولكن هناك أخطاء طفيفة في الخطوات الوسيطة.',
          module: 'المعادلات',
        },
        'اختبار قصير': {
          score: 19,
          max: 20,
          date: '2024-01-08',
          note: 'أداء ممتاز، مع إجابات دقيقة وواضحة.',
          module: 'الأعداد',
        },
      },
      average: 17.7,
    },
    {
      id: 2,
      studentName: 'فاطمة حسن',
      grades: {
        'امتحان الفصل الأول': {
          score: 16,
          max: 20,
          date: '2024-01-15',
          note: 'جهد جيد، لكنها تحتاج إلى تحسين سرعتها في الحل.',
          module: 'الكسور',
        },
        'واجب منزلي 1': {
          score: 18,
          max: 20,
          date: '2024-01-10',
          note: 'واجب مكتمل بشكل ممتاز مع تنظيم رائع.',
          module: 'المعادلات',
        },
        'اختبار قصير': {
          score: 17,
          max: 20,
          date: '2024-01-08',
          note: 'إجابات صحيحة، لكن بعض النقاط كانت غير مكتملة.',
          module: 'الأعداد',
        },
      },
      average: 17.0,
    },
    {
      id: 3,
      studentName: 'عمر السعيد',
      grades: {
        'امتحان الفصل الأول': {
          score: 15,
          max: 20,
          date: '2024-01-15',
          note: 'يحتاج إلى مراجعة المفاهيم الأساسية قبل الامتحانات.',
          module: 'الكسور',
        },
        'واجب منزلي 1': {
          score: 14,
          max: 20,
          date: '2024-01-10',
          note: 'الواجب غير مكتمل، يحتاج إلى بذل مجهود أكبر.',
          module: 'المعادلات',
        },
        'اختبار قصير': {
          score: 16,
          max: 20,
          date: '2024-01-08',
          note: 'تحسن ملحوظ مقارنة بالواجبات السابقة.',
          module: 'الأعداد',
        },
      },
      average: 15.0,
    },
  ]);

  const classes = ['5أ', '4أ', '6أ'];
  const subjects = ['الرياضيات', 'العلوم', 'اللغة العربية'];
  const gradeSystems = ['20', '15', '10'];
  const assessmentTypes = ['امتحان', 'واجب منزلي', 'اختبار قصير', 'مشروع', 'مشاركة صفية'];

  const handleAddGrade = () => {
    if (!newGrade.studentId || !newGrade.assessmentType || !newGrade.score || !newGrade.date) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const updatedGrades = grades.map((student) => {
      if (student.id.toString() === newGrade.studentId) {
        const newGrades = {
          ...student.grades,
          [newGrade.assessmentType]: {
            score: parseFloat(newGrade.score),
            max: parseInt(gradeSystem),
            date: newGrade.date,
            note: newGrade.note,
            module: newGrade.module,
          },
        };
        const scores = Object.values(newGrades)
          .map((g) => g.score)
          .filter((s) => s !== undefined);
        const average = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : student.average;

        return { ...student, grades: newGrades, average };
      }
      return student;
    });

    setGrades(updatedGrades);
    setShowAddModal(false);
    setNewGrade({ studentId: '', assessmentType: '', score: '', date: '', note: '', module: '' });
  };

  return (
    <div className="space-y-6" dir="rtl">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الفصل</label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">المادة</label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نظام التقييم</label>
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
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.grades['امتحان الفصل الأول']?.score || '-'}/{gradeSystem}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {student.grades['امتحان الفصل الأول']?.note
                        ? `${student.grades['امتحان الفصل الأول'].note.substring(0, 20)}${student.grades['امتحان الفصل الأول'].note.length > 20 ? '...' : ''}`
                        : '-'}
                      {student.grades['امتحان الفصل الأول']?.module ? ` (${student.grades['امتحان الفصل الأول'].module})` : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.grades['واجب منزلي 1']?.score || '-'}/{gradeSystem}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {student.grades['واجب منزلي 1']?.note
                        ? `${student.grades['واجب منزلي 1'].note.substring(0, 20)}${student.grades['واجب منزلي 1'].note.length > 20 ? '...' : ''}`
                        : '-'}
                      {student.grades['واجب منزلي 1']?.module ? ` (${student.grades['واجب منزلي 1'].module})` : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {student.grades['اختبار قصير']?.score || '-'}/{gradeSystem}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {student.grades['اختبار قصير']?.note
                        ? `${student.grades['اختبار قصير'].note.substring(0, 20)}${student.grades['اختبار قصير'].note.length > 20 ? '...' : ''}`
                        : '-'}
                      {student.grades['اختبار قصير']?.module ? ` (${student.grades['اختبار قصير'].module})` : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`text-sm font-bold ${
                        student.average >= 16
                          ? 'text-green-600'
                          : student.average >= 12
                          ? 'text-blue-600'
                          : student.average >= 10
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {student.average.toFixed(1)}/{gradeSystem}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() =>
                        setNewGrade({
                          studentId: student.id.toString(),
                          assessmentType: '',
                          score: '',
                          date: '',
                          note: '',
                          module: '',
                        })
                      }
                      className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mx-1"
                    >
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الطالب</label>
                <select
                  value={newGrade.studentId}
                  onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">اختر الطالب</option>
                  {grades.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.studentName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نوع التقييم</label>
                <select
                  value={newGrade.assessmentType}
                  onChange={(e) => setNewGrade({ ...newGrade, assessmentType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">اختر النوع</option>
                  {assessmentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الدرجة</label>
                  <input
                    type="number"
                    min="0"
                    max={gradeSystem}
                    value={newGrade.score}
                    onChange={(e) => setNewGrade({ ...newGrade, score: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">من</label>
                  <input
                    type="number"
                    value={gradeSystem}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">التاريخ</label>
                <input
                  type="date"
                  value={newGrade.date}
                  onChange={(e) => setNewGrade({ ...newGrade, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">الوحدة</label>
                <input
                  type="text"
                  value={newGrade.module}
                  onChange={(e) => setNewGrade({ ...newGrade, module: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل الوحدة (مثال: الكسور)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ملاحظات</label>
                <textarea
                  rows={4}
                  value={newGrade.note}
                  onChange={(e) => setNewGrade({ ...newGrade, note: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل ملاحظات حول سلوك الطالب أو أدائه..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 rtl:space-x-reverse mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewGrade({ studentId: '', assessmentType: '', score: '', date: '', note: '', module: '' });
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddGrade}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
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