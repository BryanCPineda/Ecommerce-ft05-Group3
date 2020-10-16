import Axios from 'axios'
const GET_ORDER_CART = 'GET_ORDER_CART'

export function getOrder() {
    return dispatch => {
       return Axios.get("http://localhost:4000/users/1/cart")
        .then( res => res.data)
        .then( res => {console.log('get order', res)

            dispatch({ type: GET_ORDER_CART, payload: res})}
        ) }}
