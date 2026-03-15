import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Signup from './pages/Signup.jsx'
import Welcome from './pages/Welcome.jsx'
import ClientSignup from './pages/ClientSignup.jsx'
import ClientCard from './pages/ClientCard.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Encaisser from './pages/Encaisser.jsx'
import MesClients from './pages/MesClients.jsx'
import SystemePoints from './pages/SystemePoints.jsx'
import MonCompte from './pages/MonCompte.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/inscription" element={<Signup />} />
      <Route path="/bienvenue" element={<Welcome />} />
      <Route path="/rejoindre/:slug" element={<ClientSignup />} />
      <Route path="/rejoindre" element={<ClientSignup />} />
      <Route path="/ma-carte" element={<ClientCard />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="encaisser" element={<Encaisser />} />
        <Route path="clients" element={<MesClients />} />
        <Route path="points" element={<SystemePoints />} />
        <Route path="compte" element={<MonCompte />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
