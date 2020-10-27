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
  const producto = order

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center" style={{color: 'white'}}>
        <div className="flex-orders d-flex flex-column" style={{marginTop: '-350px'}}>
          <p style={{color: 'white', fontSize: '40px'}}>Personal information:</p>
          <br></br>
          <div>
            <p style={{fontSize: '25px'}}>First Name: {user && user.name}</p>
            <p style={{fontSize: '25px'}}>Last Name: {user && user.lastname}</p>
            <p style={{fontSize: '25px'}}>Email: {user && user.email}</p>
          </div>
        </div>
      </div>
      <Container style={{marginTop: '-300px'}}>
      <CompletedOrderline />
    </Container>
    </React.Fragment>
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
