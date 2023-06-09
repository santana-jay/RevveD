import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto flex-row">
            <li className="nav-item m-3">
              <NavLink className="nav-link active" aria-current="page" to="/appointments">Appointments List</NavLink>
            </li>
            <li className="nav-item m-3">
              <NavLink className="nav-link active" aria-current="page" to="/appointments/form">Create an Appointment</NavLink>
            </li>
            <li className="nav-item m-3">
              <NavLink className="nav-link active" aria-current="page" to="/technicians">Technicians List</NavLink>
            </li>
            <li className="nav-item m-3">
              <NavLink className="nav-link active" aria-current="page" to="/appointments/form">Create a Technician</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
