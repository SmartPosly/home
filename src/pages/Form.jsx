import { useState } from 'react'

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    requirements: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        business: '',
        requirements: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 mt-10 mb-8">
      <h1 className="text-2xl font-bold mb-6 text-teal-700 text-center">
        نموذج إرسال متطلبات المنظومة
      </h1>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          تم إرسال طلبك بنجاح! سنتواصل معك قريباً.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-semibold text-slate-700">
            الاسم الكامل *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500"
            placeholder="أدخل اسمك الكامل"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-slate-700">
            البريد الإلكتروني *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-slate-700">
            رقم الهاتف *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500"
            placeholder="09XXXXXXXXX"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-slate-700">
            نوع النشاط التجاري
          </label>
          <input
            type="text"
            name="business"
            value={formData.business}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500"
            placeholder="مطعم، متجر، صيدلية ..."
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-slate-700">
            متطلبات المنظومة *
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-teal-500"
            placeholder="اكتب متطلباتك أو تفاصيل المنظومة المطلوبة..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-3 rounded-lg text-lg transition ${
            isSubmitting
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-teal-600 hover:bg-teal-700'
          } text-white`}
        >
          {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
        </button>
      </form>
    </div>
  )
}

export default Form 