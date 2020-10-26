import React,  {useEffect} from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import {deleteReview} from '../../actions/reviewsActions';
import {connect} from 'react-redux';

function DeleteReview({deleteReview, user, product}) {
  const [description, setDescription] = useState('');

  const handleOnclick = (e) => {
    e.preventDefault();
    
  }
  const handleOnChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value)
    console.log(e.target.value)
  }
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const review = {
      description: description,
      qualification: Math.round(stars),
      userdId: user.id
    };
    const id = product.id
    deleteReview(id, review);
    setShow(false);
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