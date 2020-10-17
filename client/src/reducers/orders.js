const initialState = {
    orders: []
}

export default function ordersReducer(state = initialState, action) {
   
    switch (action.type) {
        case 'GET_ALL_ORDERS':  // trae todas las ordenes
            return {
                ...state,
                orders: action.payload
            }
        case 'CREATE_ORDER':
            return {
                ...state,
            }
        case 'DELETE_ORDER': //
            return {
                ...state,
            }

        case 'UPDATE_ORDER':
            return {
                ...state,
            }
        default:
            return state;
    }
}
