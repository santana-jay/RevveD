import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufactureList from "./Inventory/ManufactureList";
import ManufactureForm from "./Inventory/ManufactureForm";
import ModelList from "./Inventory/ModelList";
import ModelForm from "./Inventory/ModelForm";
import AutomobileList from "./Inventory/AutomobileList";
import AutomobileForm from "./Inventory/AutomobileForm";
import AppointmentList from './service/AppointmentList';
import TechnicianList from './service/TechnicianList.js';
import TechnicianForm from './service/TechnicianForm.js';
import AppointmentForm from './service/AppointmentForm.js';
import AppointmentHistory from './service/AppointmentHistory.js';
import SalesPeopleList from "./Sales/SalesPeopleList";
import SalesPeopleForm from "./Sales/SalesPeopleForm";
import SalespersonHistory from "./Sales/SalespersonHistory";
import CustomerList from "./Sales/CustomerList";
import CustomerForm from "./Sales/CustomerForm";
import SalesList from "./Sales/SalesList";
import SalesForm from "./Sales/SalesForm";


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route path="manufacturer" element={<ManufactureList />} />
            <Route path="manufacturer/form" element={<ManufactureForm />} />
            <Route path="model-list" element={<ModelList />} />
            <Route path="model-list/form" element={<ModelForm />} />
            <Route path="automobile-list" element={<AutomobileList />} />
            <Route path="automobile-list/form" element={<AutomobileForm />} />
          </Route>
          <Route path="salespeople">
            <Route path="" element={<SalesPeopleList />} />
            <Route path="form" element={<SalesPeopleForm />} />
            <Route path="history" element={<SalespersonHistory />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomerList />} />
            <Route path="form" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SalesList />} />
            <Route path="form" element={<SalesForm />} />
          </Route>
          <Route path='/appointments' element={<AppointmentList />}/>
          <Route path='/appointments/form' element={<AppointmentForm />}/>
          <Route path='/technicians' element={<TechnicianList />}/>
          <Route path='/technicians/form' element={<TechnicianForm />}/>
          <Route path='/appointments/history' element={<AppointmentHistory />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
