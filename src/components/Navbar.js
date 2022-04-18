import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [navbarState, setNavbarState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let abc = localStorage.getItem("user");
    if (abc) {
      setNavbarState(true);
    }
  }, [navbarState]);

  const NavbarRendering = () => {
    if (!navbarState) {
      return (
        <>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink className="nav-link active" aria-current="page" to="/home">
            Home
          </NavLink>
          <NavLink className="nav-link active" aria-current="page" to="/userdetails">
            User Details
          </NavLink>
          <NavLink className="nav-link active" aria-current="page" to="/educationdetails">
            Education Details
          </NavLink>
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.clear();
              navigate("/");
              setNavbarState(false);
            }}
          >
            Logout
          </button>
        </>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav w-50 justify-content-evenly">{NavbarRendering()}</div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
