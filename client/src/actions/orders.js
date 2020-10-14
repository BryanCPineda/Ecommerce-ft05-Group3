import axios from "axios";

import {
    GET_ALL_ORDERS,
    CREATE_ORDER,
    DELETE_ORDER,
    UPDATE_ORDER,
  } from "../constants/orders";

const data = {
        orders: [{
                        id: 1,
                        totalPrice: 0,
                        createdAt: "2020-10-10",
                        updatedAt: "2020-10-14",  
                        userId: 1,
                        status: "cart"
                    },
                    {
                        id: 2,
                        totalPrice: 2000,
                        createdAt: "2020-09-14",
                        updatedAt: "2020-10-14",  
                        userId: 2,
                        status: "Created"
                    },
                    {
                        id: 3,
                        totalPrice: 30,
                        createdAt: "2018-10-14",
                        updatedAt: "2020-09-14",  
                        userId: 3,
                        status: "Processing"
                    }
        ]
}



    export const getAllOrders = () => (dispatch) => {
        
        dispatch({type: GET_ALL_ORDERS, payload: data})
        
    
        //axios.get("http://localhost:4000/category").then((res) => {
        //  dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
        //});
    };

    export const createOrder = () => (dispatch) =>{

    };

    export const updateOrder = () => (dispatch) =>{

    };

    export const deleteOrder = () => (dispatch) =>{

    };