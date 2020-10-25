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
import Review from '../Reviews/Reviews';
import "./Profile.css";
import { showCompletedOrders } from "../../actions/userAction";

const CompletedOrderline = ({ showCompletedOrders, user, order }) => {
  const idUser = user && user.id;

  useEffect(() => {
    if(user){
      showCompletedOrders(user.id);
    }
  }, []);

  //const orders = showCompletedOrders();
  return (
    <div>
      <h3 style={{color: 'white'}}>Previous Orders</h3>
      <Row>
        <Col>
          <div
            className="table-responsive"
            style={{ backgroundColor: "white" }}
          >
            <table class="table">
              <thead>
                <tr>
                  {/* <th scope="col">Order</th> */}
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <td className="d-flex justify-content-between flex-column" >
                    {order &&
                      order.map((order, index) => (
                        <div key={index}>
                          <p className="mt-4">{order.id}</p>
                        </div>
                      ))}
                      
                  </td> */}
                  <td>
                    {order && order.map((order, index) => (
                <div key={index}>
                  {order.state === "Complete" &&
                  order.products.map((product, index) => (
                    <div key={index}>
                      <p>{product.name}</p>
                    </div>      
                  ))}
                </div>
                ))}
                  </td>

                  <td>
                    {order && order.map((order, index) => (
                <div key={index}>
                  {order.state === "Complete" &&
                  order.products.map((ele, index) => (
                    <div key={index}>
                      <p>{ele.orderline.price}</p>
                    </div>
                    
                  ))}   
                </div>
                ))}
                  </td>
                  <td>
                    {order && order.map((order, index) => (
                <div key={index}>
                  {order.state === "Complete" &&
                  order.products.map((ele, index) => (
                    <div key={index}>
                      <p>{ele.orderline.quantity}</p>
                    </div>
                    
                  ))}   
                </div>
                ))}
                  </td>
                </tr>
              </tbody>
            </table>
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
