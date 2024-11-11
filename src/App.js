import { Route, Routes } from 'react-router-dom'
import './App.css'
import CreateWeekDocLayout from './Layout/CreateWeekDocLayout/CreateWeekDocLayout'
import CreateShiftDocLayout from './Layout/CreateShiftDocLayout/CreateShiftDocLayout'
import CreateMonthDocLayout from './Layout/CreateMonthDocLayout/CreateMonthDocLayout'
import CreateMaintenDocLayout from './Layout/CreateMaintenDocLayout/CreateMaintenDocLayout'
import CreateAdminDocLayout from './Layout/CreateAdminDocLayout/CreateAdminDocLayout'
import LoginLayout from './Layout/LoginLayout/LoginLayout'
import MainLayout from './Layout/MainLayout/MainLayout'

function App() {
// Disable the back button
window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function () {
    alert('Chú ý không được sử dụng phím Back \nSử dụng nút đóng/close bên trên nếu có!');
    window.history.pushState(null, null, window.location.href); // Prevents going back
});



   return (
      <div className="App">
         <Routes>
            <Route path="/login" element={<LoginLayout />} />
            <Route path="/" element={<MainLayout />} />
            <Route path="/createweek" element={<CreateWeekDocLayout />} />
            <Route path="/createmonth" element={<CreateMonthDocLayout />} />
            <Route path="/createshift" element={<CreateShiftDocLayout />} />
            <Route path="/createmainten" element={<CreateMaintenDocLayout />} />
            <Route path="/createadminitrative" element={<CreateAdminDocLayout />} />
         </Routes>
      </div>
   )
}

export default App
