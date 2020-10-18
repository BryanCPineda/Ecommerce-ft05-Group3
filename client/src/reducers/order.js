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
        case 'CART_CHANGE':
            return {
                ...state,
            }
        case 'EMPTY_CART':
            return {
                ...state,
            }
        case 'DELETE_ITEM_CART':
            return {
                ...state,
            }
        default:
            return state;
    }
}