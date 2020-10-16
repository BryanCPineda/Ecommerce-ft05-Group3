import {
    GET_ALL_USER_ORDERS
    } from "../constants/CartConstant";  

const initialState = {
        quantity: 0,
        price: 0,
        producto:''   
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USER_ORDERS:  // trae todas las ordenes de un usuario
            return {
                ...state,
                orders: { quantity: action.payload.quantity, 
                          price: action.payload.price, 
                          producto: action.payload.productId }
            }
        }
    }