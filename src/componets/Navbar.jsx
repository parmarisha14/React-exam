import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/users/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#1c1c1c" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#00bcd4" }}>
          HotelMS
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#fff" }}>
                Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reserve" style={{ color: "#fff" }}>
                Reservation Form
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations" style={{ color: "#fff" }}>
                Reservation List
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item me-2">
                  <span className="navbar-text text-light">Hello, {user.email}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-success btn-sm" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
