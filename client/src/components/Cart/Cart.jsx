import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Table,
  Button,
  Card,
  Modal,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiShoppingCart } from "react-icons/fi";
import "./Cart.css";
import DropD from "./dropdown.jsx";
import { FiTrash2 } from "react-icons/fi";

//import AddImages from "./AddImages";
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

          <Table
            responsive="sm"
            striped
            bordered
            hover
            variant="light"
            className="table-container"
          >
            <thead>
              <tr>
                <th>Mancuerna 15kg</th>
                <th>Imagenes.jpg</th>

                <th>250</th>
                <th>
                  <DropD />
                </th>
                <Button size="sm" className="cart-button">
                  Eliminar
                </Button>
              </tr>
              <tr>
                <th>Mancuerna 15kg</th>
                <th>Imagenes.jpg</th>

                <th>250</th>
                <th>
                  <DropD />
                </th>
                <Button size="sm" className="cart-button">
                  Eliminar
                </Button>
              </tr>
              <tr>
                <th>Mancuerna 15kg</th>
                <th>Imagenes.jpg</th>

                <th>250$</th>
                <th>
                  <DropD />
                </th>
                <Button size="sm" className="cart-button">
                  Eliminar
                </Button>
              </tr>
              <tr>
                <th>Mancuerna 15kg</th>
                <th>Imagenes.jpg</th>

                <th>250$</th>
                <th>
                  <DropD />
                </th>
                <Button size="sm" className="cart-button">
                  Eliminar
                </Button>
              </tr>
            </thead>
            <tbody>
              <div className="d-flex mb-2 mr-2"></div>
              <div className=""></div>
            </tbody>
          </Table>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </div>
  );
};

export default Cart;
