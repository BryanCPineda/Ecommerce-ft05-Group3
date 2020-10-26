const initialState = {
    cart:[],
    order: {},
    products: [],
    cartProducts:[], 
    total: 0,
    reloadCart: true
}

export default function orderReducer(state = initialState, action) {
    switch (action.type) {
        case 'RELOAD_CART':   
            return {
                ...state,
                reloadCart: !state.reloadCart,
            }
        
        case 'ADD_PRODUCT_TO_CART':   
            return {
                ...state,
                cart: action.payload,
            }

        case 'UPDATE_PRODUCT_TO_CART':
            return {
                ...state,
                cart: action.payload
            }
        case "GET_PRODUCTS_FROM_CART":
            return {
                ...state,
                cartProducts: action.payload
            }
        case 'GET_ORDER_CART':  // trae todos los productos
            return {
                ...state,
                order: action.payload,
                products: action.payload.product
       
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
                products: state.products.filter(e => e.id !== action.payload)
                //state.order.orderlines.filter(e => e.id === action.id)
            }
        case 'MODIFY_TOTAL':  
            return {
                ...state,
                total: (state.total + parseInt(action.payload))
            }
        default:
            return state;
    }
}