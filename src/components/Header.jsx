import React from "react";
import { FaShoppingCart, FaClipboardList, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";
import "./Header.css";
export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className="header-container">
      <h1 className="header-title">TrendCart-<i>(Easy shop)</i></h1>
      <nav className="header-nav">
        <Link to="/" className="header-link">
          <FaHome style={{ marginRight: "5px" }} />
          Home
        </Link>

        <Link to="/cart" className="header-link">
          <FaShoppingCart style={{ marginRight: "5px" }} />
          MyCart
        </Link>

        <Link to="/order" className="header-link">
          <FaClipboardList style={{ marginRight: "5px" }} />
          MyOrder
        </Link>

        {user?.role === "admin" && <Link to="/admin" className="header-link">Admin</Link>}
        {user?.token ? <Link to="/profile" className="header-link">Profile</Link> : <Link to="/login" className="header-link">Login</Link>}
      </nav>
    </div>
  );
}
