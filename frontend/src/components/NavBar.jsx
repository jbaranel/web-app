import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./styles/Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  const logout = () => {    
    localStorage.removeItem("user")
    localStorage.removeItem("auth")
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              {/*<Link to="#" className="menu-bars">
                LOGO
              </Link>*/}
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              <Link to="/login">
                <button onClick={logout}>
                <IoIcons.IoIosLogOut />
                <span>Logout</span>
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
