import React, { useState } from 'react';
import { Plus, Calendar, Clock, FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const AbsenceManager: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('child1');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const children = [
    { id: 'child1', name: 'أحمد محمد علي' },
    { id: 'child2', name: 'فاطمة محمد علي' }
  ];

  const absenceRequests = [
    {
      id: 1,
      childId: 'child1',
      childName: 'أحمد محمد علي',
      date: '2024-01-15',
      reason: 'مرض - حمى وصداع',
      status: 'pending',
      submittedDate: '2024-01-16',
      documents: true,
      adminComment: ''
    },
    {
      id: 2,
      childId: 'child1',
      childName: 'أحمد محمد علي',
      date: '2024-01-10',
      reason: 'موعد طبي',
      status: 'approved',
      submittedDate: '2024-01-11',
      documents: true,
      adminComment: 'تم قبول الطلب مع الشهادة الطبية المقدمة',
      reviewDate: '2024-01-12'
    },
    {
      id: 3,
      childId: 'child2',
      childName: 'فاطمة محمد علي',
      date: '2024-01-08',
      reason: 'ظروف عائلية طارئة',
      status: 'rejected',
      submittedDate: '2024-01-09',
      documents: false,
      adminComment: 'يرجى تقديم مستندات داعمة للطلب',
      reviewDate: '2024-01-10'
    },
    {
      id: 4,
      childId: 'child1',
      childName: 'أحمد محمد علي',
      date: '2024-01-05',
      reason: 'إجازة عائلية',
      status: 'approved',
      submittedDate: '2024-01-04',
      documents: false,
      adminComment: 'تم قبول الطلب - إجازة مبررة',
      reviewDate: '2024-01-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'مقبول';
      case 'rejected':
        return 'مرفوض';
      default:
        return 'قيد المراجعة';
    }
  };

  const filteredRequests = absenceRequests.filter(request => 
    selectedChild === 'all' || request.childId === selectedChild
  );

  const stats = {
    total: filteredRequests.length,
    pending: filteredRequests.filter(r => r.status === 'pending').length,
    approved: filteredRequests.filter(r => r.status === 'approved').length,
    rejected: filteredRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الغياب</h2>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">جميع الأطفال</option>
            {children.map((child) => (
              <option key={child.id} value={child.id}>{child.name}</option>
            ))}
          </select>
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>طلب تبرير غياب</span>
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الطلبات', value: stats.total, color: 'bg-blue-500', icon: FileText },
          { label: 'قيد المراجعة', value: stats.pending, color: 'bg-yellow-500', icon: Clock },
          { label: 'مقبول', value: stats.approved, color: 'bg-green-500', icon: CheckCircle },
          { label: 'مرفوض', value: stats.rejected, color: 'bg-red-500', icon: XCircle }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Absence Requests */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">لا توجد طلبات غياب</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">لم تقم بتقديم أي طلبات تبرير غياب بعد</p>
            <button
              onClick={() => setShowRequestModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              تقديم طلب جديد
            </button>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div key={request.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{request.childName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ الغياب: {request.date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ التقديم: {request.submittedDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {getStatusIcon(request.status)}
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">سبب الغياب:</h4>
                <p className="text-gray-900 dark:text-white">{request.reason}</p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm text-gray-600 dark:text-gray-400">مستندات داعمة:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    request.documents 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {request.documents ? 'متوفرة' : 'غير متوفرة'}
                  </span>
                </div>
                {request.reviewDate && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    تاريخ المراجعة: {request.reviewDate}
                  </span>
                )}
              </div>

              {request.adminComment && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">تعليق الإدارة:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{request.adminComment}</p>
                </div>
              )}

              {request.status === 'pending' && (
                <div className="mt-4 flex items-center space-x-2 rtl:space-x-reverse text-sm text-yellow-600 dark:text-yellow-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span>الطلب قيد المراجعة من قبل الإدارة</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">طلب تبرير غياب</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  اختر الطفل
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  {children.map((child) => (
                    <option key={child.id} value={child.id}>{child.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  تاريخ الغياب
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  سبب الغياب
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">اختر السبب</option>
                  <option value="illness">مرض</option>
                  <option value="medical">موعد طبي</option>
                  <option value="family">ظروف عائلية</option>
                  <option value="emergency">طوارئ</option>
                  <option value="travel">سفر</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  تفاصيل إضافية
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="اكتب تفاصيل إضافية عن سبب الغياب..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  رفع مستندات داعمة (اختياري)
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    اسحب الملفات هنا أو انقر للاختيار
                  </p>
                  <input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
                </div>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  id="urgent"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="urgent" className="text-sm text-gray-700 dark:text-gray-300">
                  طلب عاجل (يتطلب مراجعة فورية)
                </label>
              </div>
            </form>
            
            <div className="flex justify-end space-x-3 rtl:space-x-reverse mt-6">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                تقديم الطلب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsenceManager;