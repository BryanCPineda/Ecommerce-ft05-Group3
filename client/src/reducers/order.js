const initialState = {
    order: {
        
    }
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ORDER_CART':  // trae todos los productos
            return {
                ...state,
                order: action.payload
       
            }
        default:
            return state;
    }
}