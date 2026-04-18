import { NavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";

export default function Navbar() {

  const getClass: NavLinkProps["className"] = ({ isActive }) =>
    "nav-link fw-bold " + (isActive ? "text-primary" : "text-dark");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 mb-4">
      <div className="container">

        <NavLink className="navbar-brand fw-bold fs-4 text-primary" to="/">
          Inventory Management System
        </NavLink>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-4">
          <li className="nav-item">
            <NavLink to="/" end className={getClass}>Home</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/categories" className={getClass}>Categories</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/products" className={getClass}>Products</NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/about" className={getClass}>About Us</NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
}