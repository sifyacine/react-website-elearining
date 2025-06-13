import React, { useState } from 'react';
import { Check, X, Eye, Calendar, User } from 'lucide-react';

const AbsenceReviews: React.FC = () => {
  const [filter, setFilter] = useState('pending');

  const absenceRequests = [
    {
      id: 1,
      studentName: 'أحمد محمد علي',
      class: '5أ',
      parentName: 'محمد علي',
      date: '2024-01-15',
      reason: 'مرض - حمى وصداع',
      status: 'pending',
      submittedDate: '2024-01-16',
      documents: true
    },
    {
      id: 2,
      studentName: 'فاطمة حسن',
      class: '4ب',
      parentName: 'حسن أحمد',
      date: '2024-01-14',
      reason: 'ظروف عائلية طارئة',
      status: 'approved',
      submittedDate: '2024-01-15',
      documents: false,
      reviewDate: '2024-01-16'
    },
    {
      id: 3,
      studentName: 'عمر السعيد',
      class: '6أ',
      parentName: 'السعيد محمد',
      date: '2024-01-13',
      reason: 'موعد طبي',
      status: 'rejected',
      submittedDate: '2024-01-14',
      documents: true,
      reviewDate: '2024-01-15',
      rejectionReason: 'لم يتم تقديم شهادة طبية'
    },
    {
      id: 4,
      studentName: 'زينب العلي',
      class: '5أ',
      parentName: 'علي حسن',
      date: '2024-01-12',
      reason: 'سفر عائلي',
      status: 'pending',
      submittedDate: '2024-01-13',
      documents: false
    }
  ];

  const filteredRequests = absenceRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">مراجعة طلبات الغياب</h2>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm text-gray-600 dark:text-gray-400">الفلترة:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">الكل</option>
            <option value="pending">قيد المراجعة</option>
            <option value="approved">مقبول</option>
            <option value="rejected">مرفوض</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الطلبات', value: absenceRequests.length, color: 'bg-blue-500' },
          { label: 'قيد المراجعة', value: absenceRequests.filter(r => r.status === 'pending').length, color: 'bg-yellow-500' },
          { label: 'مقبول', value: absenceRequests.filter(r => r.status === 'approved').length, color: 'bg-green-500' },
          { label: 'مرفوض', value: absenceRequests.filter(r => r.status === 'rejected').length, color: 'bg-red-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{request.studentName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">الصف {request.class} - ولي الأمر: {request.parentName}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(request.status)}`}>
                {getStatusText(request.status)}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">تاريخ الغياب:</p>
                <p className="font-medium text-gray-900 dark:text-white">{request.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">تاريخ التقديم:</p>
                <p className="font-medium text-gray-900 dark:text-white">{request.submittedDate}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">سبب الغياب:</p>
              <p className="text-gray-900 dark:text-white">{request.reason}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm text-gray-600 dark:text-gray-400">مستندات:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    request.documents 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {request.documents ? 'متوفرة' : 'غير متوفرة'}
                  </span>
                </div>
                {request.status === 'rejected' && request.rejectionReason && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    سبب الرفض: {request.rejectionReason}
                  </div>
                )}
              </div>

              {request.status === 'pending' && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Check className="h-4 w-4" />
                    <span>قبول</span>
                  </button>
                  <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <X className="h-4 w-4" />
                    <span>رفض</span>
                  </button>
                  <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>تفاصيل</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbsenceReviews;