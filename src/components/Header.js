import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css"

const Header = () => {
    const [activeTab, setActiveTab] = useState("Homepage");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/") {
            setActiveTab("Homepage");
        } else if (location.pathname === "/add") {
            setActiveTab("AddEdit");
        } else if (location.pathname === "/about") {
            setActiveTab("About");
        }
    }, [location]);

  return (
  <div className='header'>
      <p className='logo'>Contact App</p>
      <div className='header-right'>
         <Link to="/">
             <p
                className={`${activeTab === "Homepage" ? "active" : ""}`}
                onClick={() => setActiveTab("Homepage")}
             >Home
             </p>         
         </Link>   
         <Link to="/add">
             <p
                className={`${activeTab === "AddEdit" ? "active" : ""}`}
                onClick={() => setActiveTab("AddEdit")}
             >Add Contact
             </p>         
         </Link>
         <Link to="/about">
             <p
                className={`${activeTab === "About" ? "active" : ""}`}
                onClick={() => setActiveTab("About")}
             >About
             </p>         
         </Link>
      </div>
  </div>
  );
};

export default Header;
