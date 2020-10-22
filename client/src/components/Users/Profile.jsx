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
import Review from "../Reviews.jsx";
import "./Profile.css";

const UserProfile = ({ user }) => {
  return (
    <div>
      <Row className="products-container">
        <Col xs={2}></Col>
        <Container className="flex-orders">
          {console.log(user)}
          <h2>Personal information:</h2>
          <br></br>
          <div>
            <p>Name: {user && user.name}</p>
            <p>LastName:{user && user.lastname}</p>
            <p>Email: {user && user.email}</p>
          </div>
        </Container>
        <Container>
          <div className="flex-orders">
            <h3>Previous orders:</h3>
          </div>
        </Container>
        <Col xs={2}></Col>
      </Row>
      <Row>
        <Container fluid="sm" className="reviews-container"></Container>
      </Row>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps, null)(UserProfile);
