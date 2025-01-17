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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-manufacturer">Add a Manufacturer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-model">Add a Model</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/list-models">Models</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-automobile">Add an Automobile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/list-automobiles">Automobiles</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-technician">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/list-technicians">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-appointment">Add an Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/list-appointments">Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/service-history">Service History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
