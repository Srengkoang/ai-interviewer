import { Routes, Route } from 'react-router-dom'
import Home from './pages/Homepage/Home'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import DashboardHome from './pages/Dashboard/DashboardHome'
import VerifyCode from './pages/Auth/VerifyCode'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/dashboard" element={<DashboardHome />} />
        </Routes>
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  )
}

export default App