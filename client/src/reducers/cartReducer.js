import { GET_ALL_USER_ORDERS, 
  ADD_PRODUCT_TO_CART,
  EMPY_SHOPPING_CART, } from "../constants/cartConstants";

const initialState = {
allOrderLines: [],
cart: [],
quantity: 0,
price: 0,
};

export default function cartReducer(state = initialState, action) {
switch (action.type) {
case GET_ALL_USER_ORDERS: // trae todas las ordenes de un usuario
return {
 ...state,
 allOrderLines: action.payload.product,
 
 
};
case ADD_PRODUCT_TO_CART:
return {
 ...state,
 cart: action.payload,
};
case EMPY_SHOPPING_CART:
return {
 ...state,
 cart:[],
};
default:
return state;
}
}