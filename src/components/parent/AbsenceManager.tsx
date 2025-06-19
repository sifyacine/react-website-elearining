import React, { useState } from 'react';
import { Plus, Calendar, Clock, FileText, CheckCircle, XCircle, AlertTriangle, TrendingUp, MessageCircle } from 'lucide-react';

const AbsenceManager: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState('all');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [activeTab, setActiveTab] = useState('absences');
  const [newRequest, setNewRequest] = useState({
    childId: '',
    date: '',
    reason: '',
    details: '',
    urgent: false,
    documents: null as File[] | null,
  });

  const children = [
    { id: 'child1', name: 'أحمد محمد علي' },
    { id: 'child2', name: 'فاطمة محمد علي' },
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
      adminComment: '',
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
      reviewDate: '2024-01-12',
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
      reviewDate: '2024-01-10',
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
      reviewDate: '2024-01-05',
    },
  ];

  const attitudeReports = [
    {
      id: 1,
      childId: 'child1',
      childName: 'أحمد محمد علي',
      date: '2024-01-15',
      behaviorRating: 'ممتاز',
      participation: 'نشط جداً',
      teacherComment: 'أحمد يظهر اهتماماً كبيراً في الدروس ويشارك بنشاط في النقاشات الصفية.',
      submittedBy: 'الأستاذة فاطمة حسن',
      submittedDate: '2024-01-16',
    },
    {
      id: 2,
      childId: 'child1',
      childName: 'أحمد محمد علي',
      date: '2024-01-10',
      behaviorRating: 'جيد',
      participation: 'نشط',
      teacherComment: 'أحمد يحتاج إلى التركيز أكثر أثناء الشرح لكنه يظهر تحسناً.',
      submittedBy: 'أ. محمد السعيد',
      submittedDate: '2024-01-11',
    },
    {
      id: 3,
      childId: 'child2',
      childName: 'فاطمة محمد علي',
      date: '2024-01-08',
      behaviorRating: 'ممتاز',
      participation: 'نشط جداً',
      teacherComment: 'فاطمة متعاونة للغاية وتساعد زملاءها في المشاريع الجماعية.',
      submittedBy: 'الأستاذة سارة أحمد',
      submittedDate: '2024-01-09',
    },
    {
      id: 4,
      childId: 'child2',
      childName: 'فاطمة محمد علي',
      date: '2024-01-05',
      behaviorRating: 'جيد جداً',
      participation: 'نشط',
      teacherComment: 'فاطمة تظهر تقدماً ملحوظاً في التفاعل مع الدروس.',
      submittedBy: 'أ. علي حسن',
      submittedDate: '2024-01-06',
    },
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

  const getBehaviorColor = (rating: string) => {
    switch (rating) {
      case 'ممتاز':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'جيد جداً':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'جيد':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      default:
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
    }
  };

  const filteredRequests = absenceRequests.filter(
    (request) => selectedChild === 'all' || request.childId === selectedChild
  );

  const filteredAttitudeReports = attitudeReports.filter(
    (report) => selectedChild === 'all' || report.childId === selectedChild
  );

  const stats = {
    total: filteredRequests.length,
    pending: filteredRequests.filter((r) => r.status === 'pending').length,
    approved: filteredRequests.filter((r) => r.status === 'approved').length,
    rejected: filteredRequests.filter((r) => r.status === 'rejected').length,
  };

  const attitudeStats = {
    total: filteredAttitudeReports.length,
    excellent: filteredAttitudeReports.filter((r) => r.behaviorRating === 'ممتاز').length,
    veryGood: filteredAttitudeReports.filter((r) => r.behaviorRating === 'جيد جداً').length,
    good: filteredAttitudeReports.filter((r) => r.behaviorRating === 'جيد').length,
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submitting the absence request
    const newAbsenceRequest = {
      id: absenceRequests.length + 1,
      childId: newRequest.childId,
      childName: children.find((child) => child.id === newRequest.childId)?.name || '',
      date: newRequest.date,
      reason: newRequest.reason + (newRequest.details ? ` - ${newRequest.details}` : ''),
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      documents: !!newRequest.documents,
      adminComment: '',
    };
    // In a real app, send to backend
    console.log('Submitting absence request:', newAbsenceRequest);
    setShowRequestModal(false);
    setNewRequest({
      childId: '',
      date: '',
      reason: '',
      details: '',
      urgent: false,
      documents: null,
    });
  };

  const renderAbsenceContent = () => (
    <>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الطلبات', value: stats.total, color: 'bg-blue-500', icon: FileText },
          { label: 'قيد المراجعة', value: stats.pending, color: 'bg-yellow-500', icon: Clock },
          { label: 'مقبول', value: stats.approved, color: 'bg-green-500', icon: CheckCircle },
          { label: 'مرفوض', value: stats.rejected, color: 'bg-red-500', icon: XCircle },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700"
          >
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
            <div
              key={request.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
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
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      request.documents
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {request.documents ? 'متوفرة' : 'غير متوفرة'}
                  </span>
                </div>
                {request.reviewDate && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">تاريخ المراجعة: {request.reviewDate}</span>
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
    </>
  );

  const renderAttitudeContent = () => (
    <>
      {/* Attitude Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'إجمالي التقارير', value: attitudeStats.total, color: 'bg-blue-500', icon: FileText },
          { label: 'سلوك ممتاز', value: attitudeStats.excellent, color: 'bg-green-500', icon: CheckCircle },
          { label: 'سلوك جيد', value: attitudeStats.good + attitudeStats.veryGood, color: 'bg-yellow-500', icon: TrendingUp },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700"
          >
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

      {/* Attitude Reports */}
      <div className="space-y-4">
        {filteredAttitudeReports.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
            <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">لا توجد تقارير سلوك</h3>
            <p className="text-gray-600 dark:text-gray-400">لا توجد تقارير سلوك متاحة لهذا الطفل حالياً</p>
          </div>
        ) : (
          filteredAttitudeReports.map((report) => (
            <div
              key={report.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{report.childName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ التقرير: {report.date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">تاريخ التقديم: {report.submittedDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getBehaviorColor(report.behaviorRating)}`}>
                    {report.behaviorRating}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">المشاركة الصفية:</h4>
                <p className="text-gray-900 dark:text-white">{report.participation}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">تعليق المعلم:</h4>
                <p className="text-gray-600 dark:text-gray-400">{report.teacherComment}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm text-gray-600 dark:text-gray-400">مقدم من:</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{report.submittedBy}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {activeTab === 'absences' ? 'إدارة الغياب' : 'تقارير السلوك'}
        </h2>
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
          {activeTab === 'absences' && (
            <button
              onClick={() => setShowRequestModal(true)}
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>طلب تبرير غياب</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setActiveTab('absences')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'absences'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            إدارة الغياب
          </button>
          <button
            onClick={() => setActiveTab('attitude')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'attitude'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            تقارير السلوك
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'absences' ? renderAbsenceContent() : renderAttitudeContent()}

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">طلب تبرير غياب</h3>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  اختر الطفل
                </label>
                <select
                  value={newRequest.childId}
                  onChange={(e) => setNewRequest({ ...newRequest, childId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">اختر الطفل</option>
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
                  value={newRequest.date}
                  onChange={(e) => setNewRequest({ ...newRequest, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  سبب الغياب
                </label>
                <select
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">اختر السبب</option>
                  <option value="مرض">مرض</option>
                  <option value="موعد طبي">موعد طبي</option>
                  <option value="ظروف عائلية">ظروف عائلية</option>
                  <option value="طوارئ">طوارئ</option>
                  <option value="سفر">سفر</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  تفاصيل إضافية
                </label>
                <textarea
                  rows={4}
                  value={newRequest.details}
                  onChange={(e) => setNewRequest({ ...newRequest, details: e.target.value })}
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
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => setNewRequest({ ...newRequest, documents: e.target.files ? Array.from(e.target.files) : null })}
                    className="hidden"
                  />
                </div>
                {newRequest.documents && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {newRequest.documents.length} ملفات مختارة
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={newRequest.urgent}
                  onChange={(e) => setNewRequest({ ...newRequest, urgent: e.target.checked })}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="urgent" className="text-sm text-gray-700 dark:text-gray-300">
                  طلب عاجل (يتطلب مراجعة فورية)
                </label>
              </div>

              <div className="flex justify-end space-x-3 rtl:space-x-reverse mt-6">
                <button
                type="button"
                onClick={() => {
                  setShowRequestModal(false);
                  setNewRequest({
                    childId: '',
                    date: '',
                    reason: '',
                    details: '',
                    urgent: false,
                    documents: null,
                  });
                }}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                إلغاء
              </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  تقديم الطلب
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsenceManager;