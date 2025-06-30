import React, { useState } from "react";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add backend integration here
    console.log("Support ticket submitted:", formData);
    alert("تم إرسال تذكرة الدعم بنجاح! سنتواصل معك قريباً.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الدعم الفني</h1>
          <p className="text-xl text-gray-600">أرسل تذكرة دعم وسنساعدك في حل مشكلتك</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="أدخل اسمك الكامل"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                عنوان البريد الإلكتروني *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="أدخل عنوان بريدك الإلكتروني"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                الموضوع *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="وصف مختصر لمشكلتك"
              />
            </div>

            {/* Priority Field */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                مستوى الأولوية *
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="low">منخفض - استفسار عام</option>
                <option value="medium">متوسط - مشكلة بسيطة</option>
                <option value="high">عالي - النظام لا يعمل</option>
                <option value="urgent">عاجل - فشل حرج في النظام</option>
              </select>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                وصف المشكلة *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="يرجى وصف مشكلتك بالتفصيل. قم بتضمين أي رسائل خطأ، خطوات لإعادة الإنتاج، وما كنت تحاول القيام به عندما حدثت المشكلة."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors font-medium text-lg"
              >
                إرسال تذكرة الدعم
              </button>
            </div>
          </form>

          {/* Additional Support Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">طرق أخرى للحصول على المساعدة</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>📧 البريد الإلكتروني: <a href="mailto:info@smartpos.ly" className="text-teal-600 hover:text-teal-800">info@smartpos.ly</a></p>
              <p>📞 الهاتف: <a href="tel:+218913807888" className="text-teal-600 hover:text-teal-800" style={{ direction: 'ltr' }}>+218 91 380 7888</a></p>
              <p>⏰ وقت الاستجابة: نستجيب عادةً خلال 24 ساعة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support; 