import React,  {useEffect} from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import {deleteReview} from '../../actions/reviewsActions';
import {connect} from 'react-redux';

function DeleteReview({deleteReview, reviewid}) {
  const id = reviewid;

  const handleOnclick = (e) => {
    e.preventDefault();
    deleteReview(id);
  }
  
  return (
    <React.Fragment>
      <Button 
        onClick={(e)=>handleOnclick(e)}
        className=""
      >Delete review
      </Button>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    // review: state.reviewsReducer.review,
    user: state.userReducer.user,
    product: state.productReducer.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReview: (user, review) => dispatch(deleteReview(user, review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReview);