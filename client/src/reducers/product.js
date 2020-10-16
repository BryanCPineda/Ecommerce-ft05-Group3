const initialState = {
    products: {
        count: 0,
        rows: []
    },
    product:{}
}

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_PRODUCTS':  // trae todos los productos
            return {
                ...state,
                products: action.payload
            }
        case 'GET_PRODUCT_BY_ID':
            return{
                ...state,
                product: action.payload
            }    
        case 'GET_PRODUCT':
            return {
                ...state,
                product: action.payload
            }
        case 'CREATE_PRODUCT': //
            return {
                ...state,
                product: action.payload
            }

        case 'UPDATE_PRODUCT':
            return {
                ...state,
            }

        case 'DELETE_PRODUCT':

            return {
                ...state,
            }
        case 'DELETE_IMAGE_PRODUCT':
            return {
                ...state,
            }
        case 'DELETE_CATEGORY_TO_PRODUCT':
            return {
                ...state,
            }
        case 'ADD_IMAGE':
            return {
                ...state,
            }
        case 'ADD_CATEGORY_TO_PRODUCT':
            return {
                ...state,
            }
        default:
            return state;
    }
}