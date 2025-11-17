import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import { useAuth } from "./context/AuthContext"
import { Login } from './pages/Login'
import Register from './pages/Register'
import PaymentPage from './pages/PaymentPage'


function App() {
  const { user } = useAuth()

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path="/shop"
          element={user ? <Shop /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" replace />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/payment' element={<PaymentPage/>}/>
      </Routes>
    </>
  )
}

export default App;
