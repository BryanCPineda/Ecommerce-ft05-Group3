import axios from "axios";

import {
    GET_ALL_ORDERS,
    CREATE_ORDER,
    DELETE_ORDER,
    UPDATE_ORDER,
  } from "../constants/orders";

    export const getAllOrders = () => (dispatch) => {
            
        axios.get("http://localhost:4000/orders").then((res) => {
          dispatch({ type: GET_ALL_ORDERS, payload: res.data });
        });
    };

    export const createOrder = () => (dispatch) =>{

    };

    export const updateOrder = (state) => (dispatch) =>{

      axios.put("http://localhost:4000/orders/"+state.orderId, {state: state.status}).then((res)=>{
          dispatch({type: UPDATE_ORDER, payload: res.data})
      })

    };

    export const deleteOrder = (id) => (dispatch) =>{

      axios.delete("http://localhost:4000/orders/"+id).then((res)=>{
         dispatch({type: DELETE_ORDER, payload: res.data})
      })


    };