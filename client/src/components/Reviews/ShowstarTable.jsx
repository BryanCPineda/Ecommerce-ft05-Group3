import React from 'react'
import { useEffect, useState } from 'react'
import { matchReview } from "../../actions/reviewsActions";
// import {getProductReviews} from '../../actions/reviewsActions';
import store from '../../store'
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { connect } from 'react-redux';
import './Reviews.css'


function ShowstarTable({productId, idUser, getProductReviews, matchReview}) {
  const [star, setStar] = useState(0);
  
  useEffect(() => {
    // matchReview(idUser, productId)
    // getProductReviews(productId);
  }, [])  

  const state = store.getState();
  const user_productReview = state.reviewsReducer.review
  console.log('user_productReview', user_productReview)

  return (
    <React.Fragment>

    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch)=> {
  return {
    matchReview: (userId, productId) => dispatch(matchReview(userId, productId)),
    // getProductReviews: (id)=> dispatch(getProductReviews(id)),
  }
}

export default connect(null, mapDispatchToProps)(ShowstarTable);
