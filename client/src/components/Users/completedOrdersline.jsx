import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import '../Reviews/Reviews.css';
import { connect } from "react-redux";
import AddReview from '../Reviews/AddReview';
import "./Profile.css";
// import { showCompletedOrders } from "../../actions/userAction";
import { matchReview } from "../../actions/reviewsActions";
import { getCompletedOrderlines } from "../../actions/completeOrdelinesActions";
import ShowstarTable from '../Reviews/ShowstarTable'
const CompletedOrderline = ({ matchReview, getCompletedOrderlines, user, orderlines }) => {
  const idUser = user && user.id;
  const orderLines = orderlines.rows;
  const myTable = []

  useEffect(() => {
    if(user){
      // showCompletedOrders(user.id);
      getCompletedOrderlines(idUser)
    }
  }, []);
  
  const createMyTable = () =>{
    for (let i = 0; i < orderLines.length; i++) {
      myTable.push({
        id: orderLines[i].id,
        name: orderLines[i].product.name,
        price: orderLines[i].price,
        quantity: orderLines[i].quantity,
        date: orderLines[i].updatedAt,
        qualification: 'review qualification',
        description: 'review description'
      })
      matchReview(idUser, orderLines[i].product.id)
    }
    return myTable;
  }
  createMyTable();
  console.log('myTable', myTable)

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
                  <th scope="col">Products ({orderLines.length})</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Date</th>
                  <th scope="col">Qualification</th>
                  <th scope="col">Add Review</th>
                </tr>
              </thead>
              <tbody>
                {myTable && myTable.map((row, index)=>{
                  return (
                    <tr>
                      <td>
                        {row.name}
                      </td>
                      <td>
                        {row.price}
                      </td>
                      <td>
                        {row.quantity}
                      </td>
                      <td>
                        {row.date}
                      </td>
                      <td>
                        <ShowstarTable 
                          productId={row.id} 
                          idUser={idUser} 
                        />
                      </td>
                      <td>
                        <div key={index}>
                          <span>{
                            <AddReview 
                              productId={row.id} 
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
    orderlines: state.completedOrderlinesReducer.orderlines,
    // review: state
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
    getCompletedOrderlines: (id) => dispatch(getCompletedOrderlines(id)),
    matchReview: (userId, productId) => dispatch(matchReview(userId, productId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrderline);
