import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { ReactComponent as OrdersIcon } from "../../assets/orders-icon.svg";
import { ReactComponent as AcquisitionsIcon } from "../../assets/acquisitions-icon.svg";
import { ReactComponent as InspectionsIcon } from "../../assets/inspections-icon.svg";
import { logout } from "../../api/logout";
import { checkLogin } from "../../api/checkLogin";
import { useState, useEffect } from "react";

export default function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  console.log("adm", isAdmin);
  const activeNavLinkClass = ({ isActive }) => {
    return isActive ? "navbar-navlink-active" : "navbar-navlink";
  };
  function handleLogout() {
    logout().then((response) => {
      console.log(response);
      window.location.reload(false);
    });
  }

  useEffect(() => {
    checkLogin().then((response) => {
      if (response.data.includes("admin")) {
        setIsAdmin(true);
        navigate("/admin");
      } else {
        setIsAdmin(false);
        navigate("/orders");
      }
    });
  }, []);
  return (
    <div id="nav-bar">
      {!isAdmin && (
        <>
          <NavLink
            className={activeNavLinkClass}
            to="orders"
            id="navbar-top-link"
          >
            <OrdersIcon />
            Orders
          </NavLink>
          <NavLink className={activeNavLinkClass} to="acquisitions">
            <AcquisitionsIcon />
            Acquisitions
          </NavLink>
          <NavLink className={activeNavLinkClass} to="inspections">
            <InspectionsIcon />
            Inspections
          </NavLink>
        </>
      )}

      <button id="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
