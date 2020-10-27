import React from 'react'
import { useEffect, useState } from 'react'
import { matchReview } from "../../actions/reviewsActions";
import store from '../../store'
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function ShowstarTable({productId, idUser}) {
  const [star, setStar] = useState(0);
  
  useEffect(() => {
    matchReview(idUser, productId)
  }, [])  

  const state = store.getState();

  return (

      <div className='smallStars' style={{ padding: '0px'}} key={'index'}>
          <BsStarFill/>
          <BsStar/>
          <BsStar/>
          <BsStar/>
          <BsStar/>
      </div>

  )
}

// const mapDispatchToProps = ()=>{

// }

export default ShowstarTable
