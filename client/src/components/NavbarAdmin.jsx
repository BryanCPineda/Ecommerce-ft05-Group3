import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "./NavbarAdmin.css";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from 'react-redux';

import { getAllProducts } from '../actions/catalogoActions'
import { getAllCategories } from '../actions/crudCategoriesActions'
import { getAllOrders } from '../actions/orders'

function NavbarAdmin({ users, orders, products, categories, getAllProducts, getAllCategories, getAllOrders, user }) {
  
  const iAmAdmin = (
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
                <div className="h5 mt-1"></div>
              </Button>
            </Link>
            <Link to="/admin/orders">
              <Button className="select-options-admin">
                <div>Orders</div>
                <div className="h5 mt-1">{orders.length} orders</div>{" "}
              </Button>
            </Link>
            <Link to="/admin/product">
              <Button className="select-options-admin">
                <div>Products</div>
                <div className="h5 mt-1">{products.length} products</div>{" "}
              </Button>
            </Link>
            <Link to="/admin/categories">
              {" "}
              <Button className="select-options-admin">
                <div>Categories</div>
                <div className="h5 mt-1">{categories.length} categories</div>
              </Button>
            </Link>
          </Col>
          <Col xs={2}></Col>
        </Row>
      </div>
    </React.Fragment>
  );

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  useEffect(() => getAllOrders(), []);

  useEffect(() => getAllProducts(), []);

  useEffect(() => getAllCategories(), []);


  return (
    <React.Fragment>
      {user && user.rol === "admin" ? iAmAdmin : <Redirect to="/error404" />}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.userReducer.allUsers,
    orders: state.ordersReducer.orders,
    products: state.catalogo.allProducts,
    categories : state.crudCategories.allCategories,
    user: state.userReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    getAllCategories: () => dispatch(getAllCategories()),
    getAllOrders: () => dispatch(getAllOrders())
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(NavbarAdmin);
