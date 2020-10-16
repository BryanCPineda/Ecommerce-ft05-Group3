import React from "react";
import { Link } from 'react-router-dom';
import './NavbarAdmin.css';
import { Row, Col, Button } from 'react-bootstrap';
 
function NavbarAdmin() {
  return (
    <React.Fragment>
    <div className="navbar-admin d-flex justify-content-center">
      <Link to="/user/catalogo">
        <div className="brand logo-admin ">
          <img className="image-brand" src={"/images/brand4.png"} alt="logo"></img>
        </div>
      </Link>
      <div className="">
          <h2 className="brand title-admin">Admin Panel</h2>
      </div>
    </div>
    <div className="admin-panel-container">
            <Row>
                <Col xs={2}></Col>
                <Col className="d-flex justify-content-around">
                <Link to=""><Button className="select-options-admin">Users</Button></Link>
                <Link to="/admin/product"><Button className="select-options-admin">Products</Button></Link>
                <Link to="/admin/categories" > <Button className="select-options-admin">Categories</Button></Link>
                </Col>
                <Col xs={2}></Col>
            </Row>
        </div>
    </React.Fragment>
  );
}

export default NavbarAdmin;
