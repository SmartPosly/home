import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      title: "نقاط البيع",
      description: "واجهة سهلة الاستخدام لإدارة عمليات البيع بسرعة وكفاءة."
    },
    {
      title: "إدارة الطلبات",
      description: "تحكم كامل في الطلبات من جميع القنوات مع تقارير موحدة."
    },
    {
      title: "إدارة المخزون",
      description: "تتبع المخزون في الوقت الفعلي مع تنبيهات إعادة الطلب."
    },
    {
      title: "المحاسبة والمالية",
      description: "إدارة مالية متكاملة مع تقارير دقيقة وسهلة الفهم."
    },
    {
      title: "إدارة علاقات العملاء",
      description: "تتبع بيانات العملاء وتخصيص العروض لتعزيز الولاء."
    },
    {
      title: "الموارد البشرية والرواتب",
      description: "إدارة الموظفين وكشوف الرواتب بسهولة وفعالية."
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 px-4">
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              برنامج SMARTPoS لإدارة الاسواق والمحلات التجارية
            </h1>
            <p className="text-lg md:text-xl mb-8 text-slate-600">
              الحل الشامل لتبسيط عمليات البيع بالتجزئة في الاسواق و المحلات التجاريةمن نقاط البيع إلى إدارة المخزون والمحاسبة والعملاء.
            </p>
            <Link 
              to="/form" 
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
            >
              ابدأ الآن
            </Link>
          </div>
          <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0">
            <img 
              src="/images/1.png" 
              alt="جهاز نقاط البيع SMARTPoS" 
              className="rounded-xl shadow-lg w-full max-w-md h-auto object-cover" 
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-100 py-12" id="features">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6 w-full sm:w-72 text-center">
              <h3 className="text-teal-500 text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home 