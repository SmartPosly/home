import React, { useState } from "react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [homeContent, setHomeContent] = useState({
    heroTitle: "SMARTPoS - نظام نقاط البيع الذكي",
    heroSubtitle: "حلول متكاملة لإدارة المبيعات والمخزون",
    featuresTitle: "المميزات الرئيسية",
    features: [
      "إدارة المبيعات والمخزون",
      "تقارير مفصلة",
      "دعم متعدد العملات",
      "واجهة سهلة الاستخدام"
    ]
  });

  const [pricingPackages, setPricingPackages] = useState([
    {
      id: 1,
      name: "الباقة الأساسية",
      price: "99",
      currency: "دينار",
      period: "شهرياً",
      features: ["إدارة المبيعات", "تقارير أساسية", "دعم فني"],
      popular: false
    },
    {
      id: 2,
      name: "الباقة المتقدمة",
      price: "199",
      currency: "دينار",
      period: "شهرياً",
      features: ["جميع مميزات الباقة الأساسية", "إدارة المخزون", "تقارير متقدمة", "دعم فني 24/7"],
      popular: true
    },
    {
      id: 3,
      name: "الباقة الاحترافية",
      price: "299",
      currency: "دينار",
      period: "شهرياً",
      features: ["جميع مميزات الباقة المتقدمة", "إدارة متعددة الفروع", "API مخصص", "تدريب مجاني"],
      popular: false
    }
  ]);

  const [contactInfo, setContactInfo] = useState({
    email: "info@smartpos.ly",
    phone: "+218913807888",
    address: "32°53'22.1\"N 13°11'31.0\"E",
    facebook: "https://www.facebook.com/SMARTPOS23"
  });

  const [supportSettings, setSupportSettings] = useState({
    responseTime: "24 ساعة",
    supportEmail: "info@smartpos.ly",
    supportPhone: "+218913807888"
  });

  const handleHomeContentChange = (field, value) => {
    setHomeContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...homeContent.features];
    newFeatures[index] = value;
    setHomeContent(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handlePricingChange = (packageId, field, value) => {
    setPricingPackages(prev => prev.map(pkg => 
      pkg.id === packageId ? { ...pkg, [field]: value } : pkg
    ));
  };

  const handlePricingFeatureChange = (packageId, featureIndex, value) => {
    setPricingPackages(prev => prev.map(pkg => {
      if (pkg.id === packageId) {
        const newFeatures = [...pkg.features];
        newFeatures[featureIndex] = value;
        return { ...pkg, features: newFeatures };
      }
      return pkg;
    }));
  };

  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSupportChange = (field, value) => {
    setSupportSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveChanges = () => {
    // TODO: Add backend integration here
    console.log("Saving changes:", {
      homeContent,
      pricingPackages,
      contactInfo,
      supportSettings
    });
    alert("تم حفظ التغييرات بنجاح!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة الإدارة</h1>
          <p className="text-gray-600">تحرير محتوى الموقع وحزم الأسعار</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: "home", name: "الصفحة الرئيسية" },
                { id: "pricing", name: "حزم الأسعار" },
                { id: "contact", name: "معلومات الاتصال" },
                { id: "support", name: "إعدادات الدعم" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Home Page Content */}
            {activeTab === "home" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">محتوى الصفحة الرئيسية</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان الصفحة الرئيسية
                  </label>
                  <input
                    type="text"
                    value={homeContent.heroTitle}
                    onChange={(e) => handleHomeContentChange("heroTitle", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    النص الفرعي
                  </label>
                  <input
                    type="text"
                    value={homeContent.heroSubtitle}
                    onChange={(e) => handleHomeContentChange("heroSubtitle", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان المميزات
                  </label>
                  <input
                    type="text"
                    value={homeContent.featuresTitle}
                    onChange={(e) => handleHomeContentChange("featuresTitle", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المميزات
                  </label>
                  {homeContent.features.map((feature, index) => (
                    <input
                      key={index}
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2"
                      placeholder={`الميزة ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Packages */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">حزم الأسعار</h2>
                
                {pricingPackages.map((pkg) => (
                  <div key={pkg.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">الباقة {pkg.id}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          اسم الباقة
                        </label>
                        <input
                          type="text"
                          value={pkg.name}
                          onChange={(e) => handlePricingChange(pkg.id, "name", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          السعر
                        </label>
                        <input
                          type="text"
                          value={pkg.price}
                          onChange={(e) => handlePricingChange(pkg.id, "price", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          العملة
                        </label>
                        <input
                          type="text"
                          value={pkg.currency}
                          onChange={(e) => handlePricingChange(pkg.id, "currency", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          الفترة
                        </label>
                        <input
                          type="text"
                          value={pkg.period}
                          onChange={(e) => handlePricingChange(pkg.id, "period", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المميزات
                      </label>
                      {pkg.features.map((feature, index) => (
                        <input
                          key={index}
                          type="text"
                          value={feature}
                          onChange={(e) => handlePricingFeatureChange(pkg.id, index, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2"
                          placeholder={`الميزة ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={pkg.popular}
                          onChange={(e) => handlePricingChange(pkg.id, "popular", e.target.checked)}
                          className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">الباقة الأكثر شعبية</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact Information */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">معلومات الاتصال</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContactChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    style={{ direction: 'ltr' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value={contactInfo.address}
                    onChange={(e) => handleContactChange("address", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رابط فيسبوك
                  </label>
                  <input
                    type="url"
                    value={contactInfo.facebook}
                    onChange={(e) => handleContactChange("facebook", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Support Settings */}
            {activeTab === "support" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">إعدادات الدعم</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وقت الاستجابة
                  </label>
                  <input
                    type="text"
                    value={supportSettings.responseTime}
                    onChange={(e) => handleSupportChange("responseTime", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    بريد الدعم الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={supportSettings.supportEmail}
                    onChange={(e) => handleSupportChange("supportEmail", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    هاتف الدعم
                  </label>
                  <input
                    type="text"
                    value={supportSettings.supportPhone}
                    onChange={(e) => handleSupportChange("supportPhone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    style={{ direction: 'ltr' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={saveChanges}
            className="bg-teal-600 text-white py-3 px-8 rounded-md hover:bg-teal-700 transition-colors font-medium text-lg"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin; 