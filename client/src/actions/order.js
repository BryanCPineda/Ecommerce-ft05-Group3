import Axios from "axios";
const GET_ORDER_CART = "GET_ORDER_CART";
const CART_CHANGE = "CART_CHANGE";
const EMPTY_CART = "EMPTY_CART";
const DELETE_ITEM_CART = "DELETE_ITEM_CART";

export function getOrder() {
  return (dispatch) => {
    return Axios.get("http://localhost:4000/users/1/cart")
      .then((res) => res.data)
      .then((res) => {
        dispatch({ type: GET_ORDER_CART, payload: res });
      });
  };
}

export function cambioEstadoCarrito(id, status) {
  let estado = {
    state: "Created",
  };
  return (dispatch) => {
    return Axios.put("http://localhost:4000/orders/" + id, estado)
      .then((res) => res.data)
      .then((res) => {
        console.log("compra creada", res);

        dispatch({ type: CART_CHANGE, payload: res });
      });
  };
}

export function vaciarCarrito() {
  return (dispatch) => {
    return Axios.delete("http://localhost:4000/users/1/cart")
      .then((res) => res.data)
      .then((res) => dispatch({ type: EMPTY_CART, payload: res }));
  };
}

// server.delete("/:idUser/cart/:itemId"

export function quitarItemCarrito(id) {
  return (dispatch) => {
    return Axios.delete("http://localhost:4000/users/1/cart/" + id)
      .then((res) => res.data)
      .then((res) => {
        dispatch({ type: DELETE_ITEM_CART, payload: id });
      });
  };
}
