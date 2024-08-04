import { Outlet } from "react-router-dom";
import Navigation from "./navigation.jsx";
import "../styles/shop.css";

export default function MainShop() {
    return (
        <div className="main">
          <nav className="sidebar" key={""}>
            <Navigation />
          </nav>
          <Outlet></Outlet>
        </div> 
    );
  }