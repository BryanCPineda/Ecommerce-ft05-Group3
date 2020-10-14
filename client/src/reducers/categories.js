const initialState = {
    categories: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_CATEGORIES':  // trae todos los productos
            return {
                ...state,
                categories: action.payload
            }
        
        default:
            return state;
    }
}