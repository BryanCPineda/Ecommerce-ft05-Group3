import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Table,
  Button,
  Card,
  Modal,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import DropD from "./dropdown.jsx";
import ProductCard from "../ProductCard";
import { connect } from "react-redux";
import { getAllUserOrders } from "../../actions/cartActions";
import "./Order.css";

const Order = (props) => {
  const idUser = 1;

  console.log("las orderlinesstate", props.allOrderLines);
  useEffect(() => {
    props.getAllUserOrders(idUser);
  }, []);

  return (
    <Row>
      <Col xs={2}></Col>
      <Col>
        <Table
          responsive="sm"
          striped
          bordered
          hover
          variant="light"
          className="table-container"
        >
          {props.allOrderState ? (
            props.allOrderState.map((ele, index) => (
              <thead>
                <tr>
                  <th>
                    <Image
                      src={ele.images[0]}
                      alt="File Image of the Product"
                    />
                  </th>
                  <th>{ele.name}</th>

                  <th>Price: ${ele.orderline.price}</th>
                  <th>
                    <DropD quantity={ele.orderline.quantity} />
                  </th>
                  <Button size="sm" className="cart-button">
                    Eliminar
                  </Button>
                </tr>
              </thead>
            ))
          ) : (
            <div>
              <p>
                <img src="../images/shopping_Sad-512.png" alt="sad cart"></img>
                <h3> Your cart is empty!</h3> <br></br> Add something to make me
                happy :)
              </p>
            </div>
          )}
        </Table>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    allOrderState: state.cartReducer.allOrderLines,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserOrders: (idUser) => dispatch(getAllUserOrders(idUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
