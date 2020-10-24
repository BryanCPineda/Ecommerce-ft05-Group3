import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Form,
} from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from "react-redux";
import AddReview from "../Reviews/AddReview.jsx";
import EditReview from "../Reviews/EditReview.jsx";
import "./Profile.css";
import { showCompletedOrders } from "../../actions/userAction";
import CompletedOrderline from "./completedOrdersline";

const UserProfile = ({ showCompletedOrders, user, order }) => {
  
  const idUser = user && user.id;

  useEffect(() => {
    showCompletedOrders(idUser);
  }, []);

  //const orders = showCompletedOrders();
  const producto = order.product && order.product[0];

  return (
    <div>
      <Row className="products-container">
        <Col xs={2}></Col>
        <Container className="flex-orders">
          <h2>Personal information:</h2>
          <br></br>
          <div>
            <p>Name: {user && user.name}</p>
            <p>LastName:{user && user.lastname}</p>
            <p>Email: {user && user.email}</p>
          </div>
          <div className="flex-orders">
            <CompletedOrderline />
          </div>
        </Container>
        <Col xs={2}></Col>
      </Row>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    order: state.userReducer.allUsers,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
