import React from "react";
import { Link } from "react-router-dom";
import "./NavbarAdmin.css";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';

function NavbarAdmin() {
  return (
    <React.Fragment>
      <div className="navbar-admin d-flex justify-content-center">
        <Link to="/user/catalogo">
          <div className="brand logo-admin ">
            <img
              className="image-brand"
              src={"/images/brand4.png"}
              alt="logo"
            ></img>
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
            <Link to="">
              <Button className="select-options-admin">
                <div>Users</div>
                <div>asd</div>
              </Button>
            </Link>
            <Link to="/admin/product">
              <Button className="select-options-admin">
                <div>Products</div>
                <div>asd</div>{" "}
              </Button>
            </Link>
            <Link to="/admin/categories">
              {" "}
              <Button className="select-options-admin">
                <div>Categories</div>
                <div>asd</div>
              </Button>
            </Link>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.catalogo.allProducts,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setProductsLoading: () => dispatch(setProductsLoading()),
//     getAllProducts: () => dispatch(getAllProducts()),
//   }
// }

export default connect( mapStateToProps, null )(NavbarAdmin);
