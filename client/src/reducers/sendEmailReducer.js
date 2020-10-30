const initialState = {
    response: '',
    forgotPassword: false
}

export default function sendEmailReducer(state = initialState, action) {
    switch (action.type) {
        case 'WELCOME_EMAIL':
            return {
                ...state,
                response: action.payload 
            }
        case 'FORGOT_PASSWORD_EMAIL':
            return {
                ...state,
                forgotPassword: true
            }
<<<<<<< HEAD
=======
        case 'SEND_PURCHASE':
            return {
                ...state,
                response: action.payload
            }
>>>>>>> f7e96b7bd39a02ee121882235d752e8a6f6fdc52
        default:
            return state;
    }
}