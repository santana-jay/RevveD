import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import SalesPeopleList from "./Sales/SalesPeopleList"
import SalesPeopleForm from "./Sales/SalesPeopleForm"
import SalespersonHistory from "./Sales/SalespersonHistory"

import CustomerList from "./Sales/CustomerList"
import CustomerForm from "./Sales/CustomerForm"

import SalesList from "./Sales/SalesList"
import SalesForm from "./Sales/SalesForm"

import ManufactureList from "./Inventory/ManufactureList"
import ManufactureForm from "./Inventory/ManufactureForm"
import ModelList from "./Inventory/ModelList"
import ModelForm from "./Inventory/ModelForm"
import AutomobileList from "./Inventory/AutomobileList"
import AutomobileForm from "./Inventory/AutomobileForm"

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="inventory">
            <Route path="manufacture" element={<ManufactureList />} />
            <Route path="manufacture/form" element={<ManufactureForm />} />
            <Route path="modellist" element={<ModelList />} />
            <Route path="modellist/form" element={<ModelForm />} />
            <Route path="automobilelist" element={<AutomobileList />} />
            <Route path="automobilelist/form" element={<AutomobileForm />} />
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

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
