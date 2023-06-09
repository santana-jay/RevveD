import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentList from './service/AppointmentList'
import TechnicianList from './service/TechnicianList.js';
import TechnicianForm from './service/TechnicianForm.js';
import AppointmentForm from './service/AppointmentForm.js';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
