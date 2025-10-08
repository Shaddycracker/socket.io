
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Layout from "./components/Layout"
import LandingPage from "./components/LandingPage"
import ProtectedRoute from "./components/ProtectiveRoute"
import Login from "./components/AuthPages/Login"
import Register from "./components/AuthPages/Register"
import NonProtectedRoute from "./components/NonProtectiveRoute"

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<NonProtectedRoute><Login /></NonProtectedRoute>} />
      <Route path='/register' element={<NonProtectedRoute><Register /></NonProtectedRoute>} />
      <Route path='/profile' element={<div>Profile Page</div>} />

      <Route path="/" element={<Layout />}>
        <Route index element={<NonProtectedRoute><LandingPage /></NonProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      </Route>
    </Routes>
  )
}

export default App
