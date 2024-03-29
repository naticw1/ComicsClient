import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo1.png";
import Default_Avatar from "../img/default-avatar.png";
import Logined_Avatar from "../img/logined-avatar.png";
import { navItems } from "./Navitems";
import DropdownNav from "./DropdownNav";

import { AuthContext } from "../context/authContext";

// import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [timerId, setTimerId] = useState(null);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      if (timerId) {
        clearTimeout(timerId); // Очистіть таймер, якщо користувач повертає курсор на елемент меню
        setTimerId(null);
      }
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      const id = setTimeout(() => {
        setDropdown(false);
      }, 500); // Задайте затримку в 500 мілісекунд
      setTimerId(id);
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="icon" />
            <span>Felix Hub</span>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/title">
            <h6>All comics</h6>
          </Link>
          {/* <div className="nav-item-container" onMouseLeave={onMouseLeave}> */}

          <li
            className="nav-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <span>
              Genres <i className="fas fa-caret-down"></i>
            </span>
            {/* Включіть DropdownNav як дочірній елемент */}
            {dropdown && <DropdownNav />}
          </li>
          {/* </div> */}

          {/* <Link className="link" to="/?genres=id">
            <h6>Genres</h6>
          </Link> */}

          {/* <span>
            <input type="text" placeholder="Search..." />
          </span> */}
          <span>
            <Link className="add-comics" to="/add-comic">
              <h6>Add Comics</h6>
            </Link>
          </span>
          <span>
            {currentUser ? (
              <Link className="link" to="/me">
                <img src={Logined_Avatar} alt="default icon" />
              </Link>
            ) : (
              <Link className="link" to="/login">
                <img src={Default_Avatar} alt="default icon" />
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// {/* <Link className="link" to="/login">
//               {/* Додайте іконку користувача тут */}
//               <img src={Default_Avatar} alt="default icon" />
//             </Link> */}
