const initialState = {
    cart:[]
}

export default function cartReducer(state = initialState, action) {
   
    switch (action.type) {
        case 'ADD_PRODUCT_TO_CART':  
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state;
    }
}
