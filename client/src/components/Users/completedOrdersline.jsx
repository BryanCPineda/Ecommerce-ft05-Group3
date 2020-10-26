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
import AddReview from '../Reviews/AddReview';
import "./Profile.css";
import { showCompletedOrders } from "../../actions/userAction";

const CompletedOrderline = ({ showCompletedOrders, user, orders }) => {
  const idUser = user && user.id;
  const pId = orders && orders.map(order=>{
    order.products.map(product => product.id)
  })
  console.log('orders', pId)
  useEffect(() => {
    if(user){
      showCompletedOrders(user.id);
    }
  }, []);

  //const orders = showCompletedOrders();
  return (
    <div className="mt-5">
      <h3 style={{color: 'white'}}>Shopping History</h3>
      <Row>
        <Col>
          <div
            className="table-responsive"
            style={{ backgroundColor: "white" }}
          >
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Add Review</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0px'}}>
                    {orders && orders.map((order, index) => (
                      <div key={index}>
                        {order &&
                        order.products.map((product, index) => (
                          <div key={index}>
                            <p>{product.name}</p>
                          </div>      
                        ))}
                      </div>
                    ))}
                  </td>
                  <td style={{ padding: '0px'}}>
                    {orders && orders.map((order, index) => (
                      <div key={index}>
                        {order && order.products.map((ele, index) => (
                          <div key={index}>
                            <p>{ele.orderline.price}</p>
                          </div>
                        ))}   
                      </div>
                    ))}
                  </td>
                  <td style={{ padding: '0px'}}>
                    {orders && orders.map((order, index) => (
                      <div key={index}>
                        {order &&
                        order.products.map((ele, index) => (
                          <div key={index}>
                            <p>{ele.orderline.quantity}</p>
                          </div>
                        ))}   
                      </div>
                    ))}
                  </td>
                  <td className="d-flex justify-content-between flex-column p-0" style={{ padding: '0px'}}>
                  {orders && orders.map((order, index) => (
                      <div key={index}>
                        {order &&
                        order.products.map((ele, index) => (
                          <div key={index}>
                            <span>{
                              <AddReview 
                                productId={ele.id} 
                              />}</span>
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
    orders: state.userReducer.allUsers,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrderline);
