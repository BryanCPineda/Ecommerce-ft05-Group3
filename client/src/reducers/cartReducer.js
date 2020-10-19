const initialState = {
    cart:[],
    products: []
}

export default function cartReducer(state = initialState, action) {
   
    switch (action.type) {
        case 'ADD_PRODUCT_TO_CART':  
            return {
                ...state,
                cart: action.payload
            }
        case "GET_PRODUCTS_FROM_CART":
            return {
                ...state,
                products: action.payload
            }
        default:
            return state;
    }
}
