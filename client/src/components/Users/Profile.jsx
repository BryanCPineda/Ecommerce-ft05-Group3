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

const UserProfile = ({ user }) => {
  return (
    <div className="products-container">
      <Row>
        <Col xs={2}></Col>
        <Col>
          {/* {console.log("erkferfiehrfuer", user)} */}
          <h2>Personal information:</h2>
          <br></br>
          <div>
            <p>First name: {user && user.name}</p>
            <p>Last name: {user && user.lastname}</p>
            <p>Email: {user && user.email}</p>
          </div>

          <Row>
            <div className="d-flex">
              <h3>Previous orders:</h3>
            </div>
          </Row>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row>
        <Container fluid="sm" className="reviews-container">
          <Row>
            <Col lg='8'>
              The product go here
            </Col>
            <Col lg='4'>
              <Row >
                <AddReview/>
              </Row>
              <br/>
              <Row>
                <EditReview/>
              </Row>
            </Col>
          </Row>
        </Container>
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
