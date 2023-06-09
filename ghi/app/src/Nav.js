import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <div className="dropdown">
              <Link className="nav-link text-white dropdown-toggle" to="inventory" type="button" data-bs-toggle="dropdown" aria-expanded="false">Inventory</Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="inventory/manufacture/">View Manufacture List</Link></li>
                <li><Link className="dropdown-item" to="inventory/manufacture/form">Create a new Manufacture</Link></li>
                <li><Link className="dropdown-item" to="inventory/modellist/">View Model List</Link></li>
                <li><Link className="dropdown-item" to="inventory/modellist/form">Create a new Model</Link></li>
                <li><Link className="dropdown-item" to="inventory/automobilelist/">View Automobile List</Link></li>
                <li><Link className="dropdown-item" to="inventory/automobilelist/form">Create a new automobile</Link></li>
              </ul>
              <Link className="nav-link text-white dropdown-toggle" to="sales" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="salespeople/">View Sales People List</Link></li>
                <li><Link className="dropdown-item" to="salespeople/form">Add New Salesperson</Link></li>
                <li><Link className="dropdown-item" to="salespeople/history">Salesperson History</Link></li>
                <li><Link className="dropdown-item" to="customers/form">Add New Customer</Link></li>
                <li><Link className="dropdown-item" to="customers/">View Customer List</Link></li>
                <li><Link className="dropdown-item" to="sales">View All Sales</Link></li>
                <li><Link className="dropdown-item" to="sales/form">Record New Sale</Link></li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
