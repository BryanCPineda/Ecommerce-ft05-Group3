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

const CompletedOrderline = ({ showCompletedOrders, user, order }) => {
  const idUser = user && user.id;

  const [state, setState] = useState({
    orders: order.allUsers,
  });

  useEffect(() => {
    showCompletedOrders();
    setState({
      orders: order.allUsers,
    });
  }, [state.orders]);

  //const orders = showCompletedOrders();
  const producto = order.product && order.product[0];
  return (
    <div>
      <h3>Previous Orders</h3>
      <Row>
        <Col>
          <div
            className="table-responsive"
            style={{ backgroundColor: "white" }}
          >
            <table className="table table-ligth table-sm table-bordered table-hover">
              <thead>
                {console.log("cosas a mapear", producto)}
                <tr className="text-center">
                  <th>Order Id</th>
                  <th> Email </th>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {/* {order &&
                  order.map((order, index) => {
                    return (
                      <tr key={index} className="text-center">
                        <td>{order.id && order.id}</td>
                        <td>{order.product[0] && order.product[0]}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>
                          {order.orderline.price && order.orderline.price}{" "}
                        </td>
                        <td> {order.state}</td>\
                      </tr>
                    );
                  })} */}
              </tbody>
            </table>
            {/* {order &&
              Object.keys(order).length ===
                0(<div className="alert alert-info">No orders to Show.</div>)} */}
          </div>
        </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrderline);
