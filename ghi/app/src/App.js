import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from "./Sales/SalesPeopleList"
import CustomerList from "./Sales/CustomerList"

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="sales">
            <Route path="" element={<SalesPeopleList />} />
          </Route>

          <Route path="customers">
            <Route path="" element={<CustomerList />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
