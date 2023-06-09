import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentList from './service/AppointmentList'
import TechnicianList from './service/TechnicianList.js';
import TechnicianForm from './service/TechnicianForm.js';
import AppointmentForm from './service/AppointmentForm.js';
import AppointmentHistory from './service/AppointmentHistory.js';
import ManufacturerList from './ManufacturerList.js';
import ManufacturerForm from './ManufacturerForm.js';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/appointments' element={<AppointmentList />}/>
          <Route path='/appointments/form' element={<AppointmentForm />}/>
          <Route path='/technicians' element={<TechnicianList />}/>
          <Route path='/technicians/form' element={<TechnicianForm />}/>
          <Route path='/appointments/history' element={<AppointmentHistory />}/>
          <Route path='/manufacturers' element={<ManufacturerList />}/>
          <Route path='/manufacturers/form' element={<ManufacturerForm />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
