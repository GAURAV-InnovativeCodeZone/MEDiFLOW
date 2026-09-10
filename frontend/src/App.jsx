import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import useAuthStore from './store/authStore'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import Doctors from './pages/Doctors'
import Patients from './pages/Patients'
import MedicalRecords from './pages/MedicalRecords'
import Analytics from './pages/Analytics'
import AIAssistant from './pages/AIAssistant'
import AuditLogs from './pages/AuditLogs'
import Profile from './pages/Profile'

const qc = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } })

function Private({ children, roles }) {
  const { user, token } = useAuthStore()
  if (!token) return <Navigate to="/login" replace />
  if (roles && user && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />
  return children
}

function Public({ children }) {
  const { token } = useAuthStore()
  return token ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  const fetchMe = useAuthStore(s => s.fetchMe)
  useEffect(() => { fetchMe() }, [])
  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Landing page — public */}
          <Route path="/" element={<Landing />} />

          {/* Auth — redirect to dashboard if already logged in */}
          <Route path="/login"    element={<Public><Login /></Public>} />
          <Route path="/register" element={<Public><Register /></Public>} />

          {/* Protected routes — Layout wraps all dashboard pages */}
          <Route element={<Private><Layout /></Private>}>
            <Route path="/dashboard"   element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/doctors"      element={<Doctors />} />
            <Route path="/patients"     element={<Private roles={['admin','super_admin','doctor']}><Patients /></Private>} />
            <Route path="/records"      element={<MedicalRecords />} />
            <Route path="/analytics"    element={<Private roles={['admin','super_admin']}><Analytics /></Private>} />
            <Route path="/ai"           element={<AIAssistant />} />
            <Route path="/audit"        element={<Private roles={['admin','super_admin']}><AuditLogs /></Private>} />
            <Route path="/profile"      element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
