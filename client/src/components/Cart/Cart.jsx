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
import Axios from "axios";

const Cart = (props) => {
  const [imagen, setImagen] = useState([]);
  const [idProd, setIdProd] = useState("");

  return (
    <div>
      <Row className="table-cart">
        <Col xs={2}></Col>
        <Col>
          <div className="d-flex justify-content-between mb-4 mt-4">
            <h2 style={{ color: "white" }}>ShoppingCart</h2>
            <Button
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

export default Cart;
