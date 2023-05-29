import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ProtectedRoute, UnProtectedRoute } from './components/ProtectedRoutes'
import SignIn from './pages/auth/sign_in'
import SignUp from './pages/auth/sign_up'
import 'react-toastify/dist/ReactToastify.css';
import PaymentPages from './pages/dashboard/payment_page'
import Providers from './pages/dashboard/providers'
import NotFound from './pages/NotFound'
import Business from './pages/dashboard/business'
import PaymentPage from './pages/payment_page'
import Settings from './pages/dashboard/setting'
import Home from './pages/dashboard/home'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app">
          <Route path="sign_in" element={
            <UnProtectedRoute>
              <SignIn />
            </UnProtectedRoute>
          } />
          <Route path="sign_up" element={
            <UnProtectedRoute>
              <SignUp />
            </UnProtectedRoute>
          } />
          <Route path="business" element={
            <ProtectedRoute>
              <Business />
            </ProtectedRoute>
          } />
          <Route path="home/:slug" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="settings/:slug" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="payment_page/:slug" element={
            <ProtectedRoute>
              <PaymentPages />
            </ProtectedRoute>
          } />
          <Route path="providers/:slug" element={
            <ProtectedRoute>
              <Providers />
            </ProtectedRoute>
          } />
          <Route path='collect_payment/:slug'
            element={<PaymentPage />}
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
