import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Form,
  Table
} from "react-bootstrap";
import '../Reviews/Reviews.css';
import { FiShoppingCart, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from "react-redux";
import AddReview from '../Reviews/AddReview';
import "./Profile.css";
import { showCompletedOrders } from "../../actions/userAction";
import { matchReview } from "../../actions/reviewsActions";
import ShowstarTable from '../Reviews/ShowstarTable'
const CompletedOrderline = ({ showCompletedOrders, matchReview, user, orders }) => {
  const idUser = user && user.id;

  useEffect(() => {
    if(user){
      showCompletedOrders(user.id);
    }
  }, []);
  
  let names = orders.map(order=>order.products.map(product=>product.name));
  let productNames = names.map(product=>product[0]);
  let ids = orders.map(order=>order.products.map(product=>product.id));
  let productIds = ids.map(product=>product[0]);
  let orderlines = orders.map(order=>order.products.map(orderline=>orderline.price));
  let orderlinePrices = orderlines.map(product=>product[0]);
  let quantities = orders.map(order=>order.products.map(product=>product.orderline.quantity));
  let orderlineQuantities = quantities.map(product=>product[0]);
  
  const myTable = []
    
  const createMyTable = () =>{
    for (let i = 0; i < ids.length; i++) {
      myTable.push({
        ids: productIds[i],
        names: productNames[i],
        prices: orderlinePrices[i],
        quantities: orderlineQuantities[i],
        qualification: ''
      })
    }
    return myTable;
  }
  createMyTable();

  return (
    <div className="mt-5">
      <h3 style={{color: 'white'}}>Shopping History</h3>
      <Row>
        <Col>
          <div
            className="table-responsive"
            style={{ backgroundColor: "white" }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Qualification</th>
                  <th scope="col">Add Review</th>
                </tr>
              </thead>
              <tbody>
                {myTable && myTable.map((row, index)=>{
                  return (
                    <tr>
                      <td>
                        {row.names}
                      </td>
                      <td>
                        {row.prices}
                      </td>
                      <td>
                        {row.quantities}
                      </td>
                      <td>
                        <ShowstarTable 
                          productId={row.ids} 
                          idUser={idUser} 
                        />
                      </td>
                      <td>
                        <div key={index}>
                          <span>{
                            <AddReview 
                              productId={row.ids} 
                              idUser={idUser} 
                            />}
                          </span>
                          </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
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
    // review: state
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
    matchReview: (userId, productId) => dispatch(matchReview(userId, productId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrderline);
