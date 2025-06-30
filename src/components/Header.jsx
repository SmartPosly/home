import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white text-black py-6 text-center shadow">
      <div className="flex flex-col items-center">
        <Link to="/">
          <img 
            src="/images/logo.png" 
            alt="SMARTPoS Logo" 
            className="max-w-xs w-11/12 h-auto mb-2" 
          />
        </Link>
        <nav className="mt-2 flex flex-wrap justify-center gap-4">
          <Link to="/#features" className="hover:text-teal-600 transition">
            الرئيسية
          </Link>
          <Link to="/pricing" className="hover:text-teal-600 transition">
            الأسعار
          </Link>
          <Link to="/#about" className="hover:text-teal-600 transition">
            عن الشركة
          </Link>
          <Link to="/support" className="hover:text-teal-600 transition">
            الدعم الفني
          </Link>
          <Link to="/store" className="hover:text-teal-600 transition">
            المتجر
          </Link>
          <Link to="/contact" className="hover:text-teal-600 transition">
            تواصل معنا
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 