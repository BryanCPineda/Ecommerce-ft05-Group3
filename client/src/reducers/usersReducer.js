const initialState = {
    users: {
        count: 0,
        rows: []
    },
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_USERS':  // trae todos los usuarios
            return {
                ...state,
                users: action.payload
            }
        case 'CREATE_USER':
            return {
                ...state,
                users: action.payload
            }
        case 'DELETE_USER': //
            return {
                ...state,
                users: action.payload
            }

        case 'UPDATE_USER':
            return {
                ...state,
            }
        default:
            return state;
    }
}