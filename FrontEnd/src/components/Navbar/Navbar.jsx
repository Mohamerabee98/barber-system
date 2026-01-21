import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <h1 className="logo">BarberShop</h1>

      <div className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/admin/login" onClick={() => setOpen(false)}>Admin</NavLink>


        {token && (
          <button className="logout-btn-nav" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
