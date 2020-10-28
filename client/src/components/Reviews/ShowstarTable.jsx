import React from 'react'
import { useEffect, useState } from 'react'
import { matchReview } from "../../actions/reviewsActions";
import store from '../../store'
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { connect } from 'react-redux';
import './Reviews.css'

function ShowstarTable({productId, idUser}) {
  const [star, setStar] = useState(0);
  
  useEffect(() => {
    // matchReview(idUser, productId)
  }, [])  

  const state = store.getState();
  // console.log('STATE', state)


  return (
    <React.Fragment>

    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch)=>{
  return {
    matchReview: (userId, productId) => dispatch(matchReview(userId, productId))
  }
}

export default connect(null, mapDispatchToProps)(ShowstarTable);
