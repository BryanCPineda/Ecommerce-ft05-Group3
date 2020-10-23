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
import { showCompletedOrders } from "../../actions/userAction";

const UserProfile = ({ showCompletedOrders, user, order }) => {
  const idUser = user && user.id;

  // const [state, setState] = useState({
  //   orders: order.allUsers,
  // });

  useEffect(() => {
    showCompletedOrders(idUser);
  }, []);

  //const orders = showCompletedOrders();

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
            <h3>Previous orders:</h3>
              <h1>{order && order.orderId}</h1>
              {/* <div>
              {order && order.product.map((ele, index) => (
              <div key={index}>
                <li>{ele.name}</li>
              </div>
            ))}  
              </div> */}
              {/* <div>
              {order && order.orderlines.map((ele, index) => (
              <div key={index}>
                <li>{ele.name}</li>
              </div>
            ))}  
              </div>       */}
            {console.log("producttttt", order.product)}
            {console.log("ordeline aqui----------------", order.orderlines)}
            {console.log("soy un idddddddddddddddddddddddddd- ---------------", order.orderId)}

            <p>Producto: {}</p>
            <p>Precio:{user && user.lastname}</p>
            <p>Cantidad: {user && user.email}</p>
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
    order: state.userReducer.allUsers,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);