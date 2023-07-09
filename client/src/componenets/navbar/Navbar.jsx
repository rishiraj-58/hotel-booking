import "./navbar.css";
import { Link, useNavigate, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log(user)
  const handleRegister = () =>{
    navigate("/register")
  }

  const handleClick = () =>{
    if(!user){
      navigate("/login")
    }
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Elite Booking</span>
        </Link>
        {user ? (
          <div>{user.username}</div>
        ) : (
          <div className="navItems">
            <button onClick={handleRegister} className="navButton">Register</button>
            <button onClick={handleClick} className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
