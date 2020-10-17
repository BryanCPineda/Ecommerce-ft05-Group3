import {
    GET_ALL_USER_ORDERS
    } from "../constants/CartConstant";  

    
const initialState = {
        allOrderLines:[],
        quantity: 0,
        price: 0,
        producto:''   
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USER_ORDERS:  // trae todas las ordenes de un usuario
            return {
                ...state,
                allOrderLines:action.payload,
                // quantity:action.payload.quantity,
                // price:action.payload.price,
                // producto:action.payload.productId
            }
            default:
      return state;
        }
    }