
import Axios from 'axios'
const GET_ORDER_CART = 'GET_ORDER_CART'
const CART_CHANGE = 'CART_CHANGE'
const EMPTY_CART = 'EMPTY_CART'
const DELETE_ITEM_CART = 'DELETE_ITEM_CART'
const MODIFY_TOTAL = "MODIFY_TOTAL"
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
const GET_PRODUCTS_FROM_CART = "GET_PRODUCTS_FROM_CART"
const RELOAD_CART = "RELOAD_CART"
const UPDATE_PRODUCT_TO_CART = 'UPDATE_PRODUCT_TO_CART'
const GET_PRODUCTS_FOR_CHECKOUT = 'GET_PRODUCTS_FOR_CHECKOUT'
const ADD_PRODUCT_TO_CART_ORDER = 'ADD_PRODUCT_TO_CART_ORDER'
const ADD_PRODUCT_TO_CART_ORDERLINE = 'ADD_PRODUCT_TO_CART_ORDERLINE'


export function reloadCart() {
  return dispatch => {
          dispatch({type: RELOAD_CART})
}
}


export function addProductToCart (idUser, body) {
return (dispatch, getState) => {

  const config = {
    headers: {
      "Content-type": "Application/json"
    },
  }

  const token = getState().userReducer.token

  if(token) {
    config.headers["x-auth-token"] = token
  }
  
    return Axios.post(`http://localhost:4000/users/${idUser}/cart`, body, config)
    .then( res => res.data)
    .then((res) => {
      dispatch({ type: ADD_PRODUCT_TO_CART, payload: res});
    });
}};



export function updateProductToCart (idUser, body) {
  return (dispatch, getState) => {
  
    const config = {
      headers: {
        "Content-type": "Application/json"
      },
    }
  
    const token = getState().userReducer.token
  
    if(token) {
      config.headers["x-auth-token"] = token
    }
    
      return Axios.put(`http://localhost:4000/users/${idUser}/cart`, body, config)
      .then( res => res.data)
      .then((res) => {
        dispatch({ type: UPDATE_PRODUCT_TO_CART, payload: res});
      });
  }};

export function getProductsFromCart(idUser){
   return (dispatch, getState) =>  {

    // const config = {
    //   headers: {
    //     "Content-type": "Application/json"
    //   }
    // }
  
    // const token = getState().userReducer.token
  
    // if(token) {
    //   config.headers["x-auth-token"] = token
    // }

     return Axios.get(`http://localhost:4000/users/${idUser}/cart`)
     .then( res => res.data)
      .then((res) => { 
           dispatch({ type: GET_PRODUCTS_FROM_CART, payload: res });
  })
}
};


export function getOrder(idUser) {
    return dispatch => {
       return Axios.get(`http://localhost:4000/users/${idUser}/cart`)
        .then( res => res.data)
        .then( res => {console.log('get order', res)

            dispatch({ type: GET_ORDER_CART, payload: res})}
        ) }}

export function cambioEstadoCarrito(id, status, totalPrice){
    let estado = {
        state : status,
        totalPrice: totalPrice
    }

    // return (dispatch, getState) => {

    //     const config = {
    //         headers: {
    //           "Content-type": "Application/json"
    //         },
    //         estado
    //       }
        
    //       const token = getState().userReducer.token
       
    //       if(token) {
    //         config.headers["x-auth-token"] = token
    //       }
    return (dispatch) =>{
        return Axios.put("http://localhost:4000/orders/checkout/"+id, estado)
        .then( res => res.data)
        .then( res => {console.log('compra creada', res)

        dispatch({ type: CART_CHANGE, payload: res });
      }).catch(error=> console.log(error))
  };
}

export function vaciarCarrito(idUser){
    return (dispatch, getState) => {

        const config = {
            headers: {
              "Content-type": "Application/json"
            },
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }

        return Axios.delete(`http://localhost:4000/users/${idUser}/cart`)
        .then( res => res.data)
        .then( res => 
            dispatch({ type: EMPTY_CART, payload: res})
        )
    }
}

// server.delete("/:idUser/cart/:itemId"

export function quitarItemCarrito(idUser, id){
    return (dispatch, getState) => {

        const config = {
            headers: {
              "Content-type": "Application/json"
            },
          }
        
          const token = getState().userReducer.token
        
          if(token) {
            config.headers["x-auth-token"] = token
          }

        return Axios.delete(`http://localhost:4000/users/${idUser}/cart/`+id)
        .then( res => res.data)
        .then( res => {
            
            dispatch({ type: DELETE_ITEM_CART, payload: id}) 
      })
    }
}

export function handleTotalReducer(valor) { 
    return dispatch => {
        dispatch({ type: MODIFY_TOTAL, payload: valor})
    }
} 

export function getProductsForCheckout(idUser){
  return (dispatch, getState) =>  {

    return Axios.get(`http://localhost:4000/users/${idUser}/checkout`)
    .then( res => res.data)
     .then((res) => { 
          dispatch({ type: GET_PRODUCTS_FOR_CHECKOUT, payload: res });
 })
}
};

// server.post("/:idUser/carrito", async (req, res) => {
//   try {
//     const { idUser } = req.params;
//     const order = await Order.findOrCreate({
//       where: { userId: idUser, state: "Cart" },
//     });
//     return res.status(200).send(order);
//   } catch (error) {
//     return res.status(400).send({ data: error });
//   }
// });

// server.post("/:idUser/carrito/:idOrder", async (req, res) => {
//   try {
//     const { idUser, idOrder } = req.params;
//     const { quantity, productId } = req.body;

// Add product to cart order y orderlines separated------------------------------------

export function addProductToCartOrder (idUser) {
  return (dispatch) => {
 
      return Axios.post(`http://localhost:4000/users/${idUser}/carrito`)
      .then( res => res.data)
      .then((res) => {
        dispatch({ type: ADD_PRODUCT_TO_CART_ORDER, payload: res});
      });
  }};

  export function addProductToCartOrderline (idUser, body) {
    return (dispatch) => {
   
        return Axios.post(`http://localhost:4000/users/${idUser}/carritoOrderline`, body)
        .then( res => res.data)
        .then((res) => {
          dispatch({ type: ADD_PRODUCT_TO_CART_ORDERLINE, payload: res});
        });
    }};