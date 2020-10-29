import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import '../Reviews/Reviews.css';
import { connect } from "react-redux";
import AddReview from '../Reviews/AddReview';
import "./Profile.css";
// import { showCompletedOrders } from "../../actions/userAction";
import { matchReview, getUserReviews } from "../../actions/reviewsActions";
import { getCompletedOrderlines } from "../../actions/completeOrdelinesActions";
import ShowstarTable from '../Reviews/ShowstarTable'
import moment from "moment";

const CompletedOrderline = ({ matchReview, getUserReviews, userReviews, getCompletedOrderlines, user, orderlines }) => {
  const idUser = user && user.id;
  const orderLines = orderlines.rows ? orderlines.rows : [];
  const myTable = []
  const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss";
  const reviews = userReviews;

  console.log('reviewsssss', reviews)
  console.log('orderLines', orderLines)

  useEffect(() => {
    if(user){
      getCompletedOrderlines(idUser);
      getUserReviews(idUser);
    }
  }, []);

  
  const createMyTable = () =>{
    for (let i = 0; i < orderLines.length; i++) {
      myTable.push({
        id: orderLines[i].product.id,
        name: orderLines[i].product.name,
        price: orderLines[i].price,
        quantity: orderLines[i].quantity,
        date: orderLines[i].updatedAt,
        // qualification: '',
        // description: ''
      })
      console.log('1stFOR ', i, ' ', myTable[i])
    }
    return myTable;
  }
  createMyTable();
  console.log('myTable', myTable)
  
  function matching(){
    for (let i = 0; i < orderLines.length; i++) {
      if (reviews[i]) {
        if (reviews[i].productId = orderLines[i].productId) {
          myTable[i].qualification = reviews[i].qualification || null;
          myTable[i].description = reviews[i].description || null;
          myTable[i].reviewid = reviews[i].id || null;
        }
      }
      console.log('2ndFOR ', i, ' ', myTable[i])
    }
    return;
  }
  matching();

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
                  <th scope="col">Products ({orderlines.count})</th>
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
                        {row.id} {row.name}
                      </td>
                      <td>
                        {row.price}
                      </td>
                      <td>
                        {row.quantity}
                      </td>
                      <td>
                        {moment(row.date).format(DATE_FORMAT)}
                      </td>
                      <td>
                        {row.qualification ? (<p>{row.qualification} <b>id{row.reviewid}</b></p> ) : 'This product has no Review'}
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
    userReviews: state.reviewsReducer.userReviews
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
    getCompletedOrderlines: (id) => dispatch(getCompletedOrderlines(id)),
    matchReview: (userId, productId) => dispatch(matchReview(userId, productId)),
    getUserReviews: (userId) => dispatch(getUserReviews(userId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrderline);
