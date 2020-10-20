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
    return Axios.get(`http://localhost:4000/products/${id}/review`)
      .then(res => res.data)
      .then(res=>{
        dispatch({type: GET_PRODUCT_REVIEWS, payload: res.data})
      })
  }
}
export function getOneStarReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/products/${id}/oneStarReviews`)
      .then(res => res.data)
      .then(data=>{
        dispatch({type: ONE_STAR_REVIEWS, payload: data.count})
      })
  }
}
export function getTwoStarsReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/products/${id}/twoStarsReviews`)
      .then(res => res.data)
      .then(data=>{
        dispatch({type: TWO_STARS_REVIEWS, payload: data.count})
      })
  }
}
export function getThreeStarsReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/products/${id}/threeStarsReviews`)
      .then(res => res.data)
      .then(data=>{
        dispatch({type: THREE_STARS_REVIEWS, payload: data.count})
      })
  }
}
export function getFourStarsReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/products/${id}/fourStarsReviews`)
      .then(res => res.data)
      .then(data=>{
        dispatch({type: FOUR_STARS_REVIEWS, payload: data.count})
      })
  }
}
export function getFiveStarsReviews(id){
  return dispatch => {
    return Axios.get(`http://localhost:4000/products/${id}/fiveStarsReviews`)
      .then(res => res.data)
      .then(data=>{
        dispatch({type: FIVE_STARS_REVIEWS, payload: data.count})
      })
  }
}