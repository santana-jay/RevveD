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


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

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
