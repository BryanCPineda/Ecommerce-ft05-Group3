import Axios from 'axios';
import {
  ONE_STAR_REVIEWS, 
  TWO_STARS_REVIEWS,
  THREE_STARS_REVIEWS,
  FOUR_STARS_REVIEWS,
  FIVE_STARS_REVIEWS,
  GET_PRODUCT_REVIEWS
} from '../constants/reviewsConstants';

export function getProductReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/reviews/product/${id}/review`)
      .then(res=> {
        console.log('getProductReviews', res.data)
        dispatch({type: GET_PRODUCT_REVIEWS, payload: res.data})
      })
  }
}
export function getOneStarReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/reviews/product/${id}/oneStarReviews`)
      .then(res=> {
        dispatch({type: ONE_STAR_REVIEWS, payload: res.data.count})
      })
    }
  }
  export function getTwoStarsReviews(id){
    return dispatch => {
      return Axios.get(`http://localhost:4000/reviews/product/${id}/twoStarsReviews`)
      .then(res=> {
        console.log('getTwoStarReviews', res.data.count)
        dispatch({type: TWO_STARS_REVIEWS, payload: res.data.count})
      })
  }
}
export function getThreeStarsReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/reviews/product/${id}/threeStarsReviews`)
      .then(res => {
        dispatch({type: THREE_STARS_REVIEWS, payload: res.data.count})
      })
  }
}
export function getFourStarsReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/reviews/product/${id}/fourStarsReviews`)
      .then(res => {
        dispatch({type: FOUR_STARS_REVIEWS, payload: res.data.count})
      })
  }
}
export function getFiveStarsReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/reviews/product/${id}/fiveStarsReviews`)
      .then(res => {
        console.log('FIVE_STARS_REVIEWS', res.data.count)
        dispatch({type: FIVE_STARS_REVIEWS, payload: res.data.count})
      })
  }
}