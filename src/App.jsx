import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Form from './pages/Form'
import ComingSoon from './pages/ComingSoon'
import ContactUs from './pages/ContactUs'
import Support from './pages/Support'
import Store from './pages/Store'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/form" element={<Form />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/store" element={<Store />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 