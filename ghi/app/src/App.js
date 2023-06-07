import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentList from '.service/AppointmentList'

function App(props) {
  if(props.appointments === undefined && props.technicians === undefined){
    return null
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='/appointments' element={<AppointmentList appointments={props.appointments} />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
