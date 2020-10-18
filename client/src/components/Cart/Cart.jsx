import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Table,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import { FiTrash2 } from "react-icons/fi";
import Order from "./Order.jsx";
import { connect } from "react-redux";
import { empyShoppingCart } from "../../actions/cartActions";

const Cart = (props) => {
  const idUser = 1;


   const onClickHandler=(idUser)=> {
     console.log('el click handler')
    props.empyShoppingCart(idUser)
 }

 

 
  return (
    <div>
      <Row className="table-cart">
        <Col xs={2}></Col>
        <Col>
          <div className="d-flex justify-content-between mb-4 mt-4">
            <h2 style={{ color: "white" }}>ShoppingCart</h2>
            <Button onClick={()=> onClickHandler(idUser)}
              style={{ backgroundColor: "#8a2be2" }}
              className="button-bootstrap mr-2"
              variant="primary"
            >
              Vaciar carrito&nbsp;
              <FiTrash2 />
            </Button>
            <Button
              style={{ backgroundColor: "#8a2be2" }}
              className="button-bootstrap mr-2"
              variant="primary"
            >
              Checkout →
            </Button>
          </div>
          <Order />
        </Col>
        <Col xs={2}></Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialCartState: state.cartReducer.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    empyShoppingCart: (idUser) => dispatch(empyShoppingCart(idUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
