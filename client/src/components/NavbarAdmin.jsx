import React from "react";
import { Link } from 'react-router-dom';
import './NavbarAdmin.css'

function NavbarAdmin() {
  return (
    <div className="d-flex justify-content-center navbar-admin">
      <Link to="/user/catalogo">
        <div className="brand logo-admin">
          <img className="image-brand" src={"/images/brand4.png"}></img>
        </div>
      </Link>
      <div >
          <h2 className="brand title-admin">Admin</h2>
      </div>
    </div>
  );
}

export default NavbarAdmin;
