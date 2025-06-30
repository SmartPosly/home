import { useState } from 'react'

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const plans = [
    {
      id: 'basic',
      title: "الخطة الأساسية",
      price: "399",
      currency: "د.ل",
      period: "سنويًا",
      features: [
        "نقاط بيع أساسية",
        "إدارة مخزون محدودة",
        "تقارير مبيعات بسيطة",
        "دعم فني عبر البريد"
      ]
    },
    {
      id: 'advanced',
      title: "الخطة المتقدمة",
      price: "799",
      currency: "د.ل",
      period: "سنويًا",
      features: [
        "كل ميزات الخطة الأساسية",
        "إدارة مخزون متقدمة",
        "تقارير وتحليلات مفصلة",
        "دعم فني مباشر"
      ]
    },
    {
      id: 'professional',
      title: "الخطة الاحترافية",
      price: "1299",
      currency: "د.ل",
      period: "سنويًا",
      features: [
        "كل ميزات الخطة المتقدمة",
        "إدارة فروع متعددة",
        "دعم فني على مدار الساعة",
        "تخصيص النظام حسب الطلب"
      ]
    }
  ]

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId)
    // Here you would typically redirect to a payment page or show a modal
    alert(`تم اختيار ${plans.find(p => p.id === planId)?.title}`)
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            خطط الأسعار
          </h1>
          <p className="text-lg text-slate-600">
            اختر الخطة المناسبة لاحتياجات عملك
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-xl shadow-lg p-8 w-full sm:w-80 text-center border-2 transition-all duration-300 ${
                selectedPlan === plan.id 
                  ? 'border-teal-500 transform scale-105' 
                  : 'border-teal-200 hover:border-teal-400'
              }`}
            >
              <h2 className="text-teal-500 text-2xl font-bold mb-4">{plan.title}</h2>
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {plan.price} {plan.currency}
              </div>
              <div className="text-slate-600 mb-6">/ {plan.period}</div>
              
              <ul className="text-right mb-8 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-slate-700">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-3 px-6 rounded-full font-semibold transition ${
                  selectedPlan === plan.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-500 hover:bg-teal-600 text-white'
                }`}
              >
                اختر الخطة
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing 