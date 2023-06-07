import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from "./Sales/SalesPeopleList"
import CustomerList from "./Sales/CustomerList"
import CustomerForm from "./Sales/CustomerForm"
import SalesPeopleForm from "./Sales/SalesPeopleForm"
import SalesList from "./Sales/SalesList"

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
          </Route>

          <Route path="customers">
            <Route path="" element={<CustomerList />} />
            <Route path="form" element={<CustomerForm />} />
          </Route>

          <Route path="sales">
            <Route path="" element={<SalesList />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
