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
import Axios from "axios";
import DropD from "./dropdown.jsx";

const Order = (props) => {
  const [imagen, setImagen] = useState([]);
  const [idProd, setIdProd] = useState("");

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
          </thead>
        </Table>
      </Col>
    </Row>
  );
};

export default Order;
