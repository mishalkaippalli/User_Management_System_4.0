import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Import your new components
import AdminRoute from './components/AdminRoute.jsx';
import UserListScreen from './pages/adminPages/UserListScreen.jsx';
import UserEditScreen from './pages/adminPages/UserEditScreen.jsx';
import ProfileScreen from './pages/userPages/ProfileScreen.jsx'

function App() {
  return (
    <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/user/profile" element={<ProfileScreen />}/>

          {/* Admin Route  */}
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          </Route>
          
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  )
}

export default App
