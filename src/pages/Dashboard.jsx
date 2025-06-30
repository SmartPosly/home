import { useState, useEffect } from 'react'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data for demonstration
  const mockUsers = [
    { id: 1, name: "أحمد محمد", email: "ahmed@example.com", role: "مدير" },
    { id: 2, name: "فاطمة علي", email: "fatima@example.com", role: "موظف" },
    { id: 3, name: "محمد حسن", email: "mohammed@example.com", role: "محاسب" },
    { id: 4, name: "سارة أحمد", email: "sara@example.com", role: "بائع" }
  ]

  useEffect(() => {
    // Simulate API call
    const fetchUsers = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUsers(mockUsers)
      } catch (err) {
        setError('تعذر تحميل المستخدمين')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const stats = [
    { title: "إجمالي المبيعات", value: "125,000 د.ل", change: "+12%", positive: true },
    { title: "عدد الطلبات", value: "1,234", change: "+8%", positive: true },
    { title: "العملاء الجدد", value: "89", change: "+15%", positive: true },
    { title: "المخزون", value: "456 منتج", change: "-3%", positive: false }
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-teal-700 mb-2">لوحة التحكم</h1>
        <p className="text-slate-600">مرحبًا بك في لوحة تحكم SMARTPoS</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-slate-600 text-sm mb-2">{stat.title}</h3>
            <div className="text-2xl font-bold text-slate-800 mb-2">{stat.value}</div>
            <div className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">المستخدمون</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-600">الاسم</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-600">البريد الإلكتروني</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-600">الدور</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{user.role}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-teal-600 hover:text-teal-800 mr-2">تعديل</button>
                    <button className="text-red-600 hover:text-red-800">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 