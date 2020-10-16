import {
    GET_ALL_USER_ORDERS
    } from "../constants/CartConstant";  

import axios from "axios";

export const empyCart = () => (dispatch) => {
    axios.delete(`http://localhost:4000//users/${idUser}/cart/`).then((res) => {
        dispatch({ type: EMPTY_CART, payload: idUser })
    })
}

export const getAllUserOrders = () => (dispatch) => {
    axios.get(`http://localhost:4000/users/${idUser}/cart`)
    .then((res) => {
        dispatch({ type: GET_ALL_USER_ORDERS, payload: res})
    })
}


