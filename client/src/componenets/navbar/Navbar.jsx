import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRegister = () => {
    navigate("/register");
  };

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("click", closeDropdown);

    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Elite Booking</span>
        </Link>
        {user ? (
          <div className="dropdownContainer" ref={dropdownRef}>
            <div className="userNavContainer" onClick={toggleDropdown}>
              <div className="image">
                <img src={user.img} alt="User" />
              </div>
              <div className="username">{user.username}</div>
            </div>
            {dropdownOpen && (
              <div className="dropdownMenu" onClick={handleDropdownClick}>
                <ul>
                  <li>
                    <Link to="/userpage">User Profile</Link>
                  </li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="navItems">
            <button onClick={handleRegister} className="navButton">
              Register
            </button>
            <button onClick={handleClick} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;