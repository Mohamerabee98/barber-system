// Navbar.jsx
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">BarberShop</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/admin/login">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
