import { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import AllApointments from './pages/Admin/AllApointments';
import DoctorsLists from './pages/Admin/DoctorsLists';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointsment from './pages/Doctor/DoctorAppointsment';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const {aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext);

  return aToken || dToken  ? (
    <div>
     <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard />}/>
          <Route path='/all-appointments' element={<AllApointments />}/>
          <Route path='/add-doctor' element={<AddDoctor />}/>
          <Route path='/doctors-list' element={<DoctorsLists />}/>

          {/* Doctors Route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />}/>
          <Route path='/doctor-appointment' element={<DoctorAppointsment />}/>
          <Route path='/doctor-profile' element={<DoctorProfile />}/>
        </Routes>
      </div>
     </div>
    </div>
  ):
  (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App