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
import ProductCard from '../ProductCard'
import { connect } from 'react-redux';
import { getAllUserOrders } from "../../actions/OrderActions";


const Order = (props) => {
  const idUser=1
  
  console.log('estado inicia---->', props.initialFormState)

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
          
            {props.initialFormState.map((ele, index) => (
              <thead>    
              <tr>
              <th>{ele.id}</th>
            
                    
                    
              
            <th>Quantity: {ele.quantity}</th>
            <th>Price: ${ele.price}</th>
              <th>
                <DropD />
              </th>
              <Button size="sm" className="cart-button">
                Eliminar
              </Button>
            </tr>
          </thead>
          ))}
        </Table>
      </Col>
    </Row>
  );
};


const mapStateToProps = (state) => {
  return {
    initialFormState: state.OrderReducer.allOrderLines,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserOrders: (idUser) => dispatch(getAllUserOrders(idUser)),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(Order);

