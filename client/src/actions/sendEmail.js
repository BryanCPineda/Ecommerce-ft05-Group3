import Axios from 'axios';

const WELCOME_EMAIL = 'WELCOME_EMAIL';
const FORGOT_PASSWORD_EMAIL = 'FORGOT_PASSWORD_EMAIL';
const SEND_PURCHASE = 'SEND_PURCHASE'

 
/*************************EMAIL DE BIENVENIDA******************************************/
export const welcomeEmail = (user) => (dispatch) => {
    
    let body = {
        user: user,
        emailType: 'welcome'                                //SE DEBE ESPECIFICAR EN EL BODY QUE SE ENVIA, QUE TIPO DE MAIL ES
    }                                                       //PARA QUE EL BACK LO RECIBA Y DIFERENCIE QUE TIPO DE MAIL SE DESEA ENVIAR

    return Axios.post('http://localhost:4000/sendEmail', body) 
        .then((res) => {
            dispatch({ type: WELCOME_EMAIL, payload: res.data });
        })
        .catch((error) => {
                console.log(error.message)
        })
}



/************************EMAIL PARA EL FORGOT PASSWORD******************************** */

export const forgotPasswordEmail = (user) => (dispatch) => {
    
    let body = {
        user: user,
        emailType: 'forgotPassword'                                //SE DEBE ESPECIFICAR EN EL BODY QUE SE ENVIA, QUE TIPO DE MAIL ES
    }                                                       //PARA QUE EL BACK LO RECIBA Y DIFERENCIE QUE TIPO DE MAIL SE DESEA ENVIAR

    return Axios.post('http://localhost:4000/sendEmail', body) 
        .then((res) => {
            dispatch({ type: FORGOT_PASSWORD_EMAIL, payload: res.data });
        })
        .catch((error) => {
                console.log(error.message)
        })
}

/*************************CONFIRMACION DE COMPRA******************************************/
export const sendPurchase = (user, info) => (dispatch) => {
    
    let body = {
        user: user,
        emailType: 'sendPurchase' ,
        info: info                               //SE DEBE ESPECIFICAR EN EL BODY QUE SE ENVIA, QUE TIPO DE MAIL ES
    }                                                       //PARA QUE EL BACK LO RECIBA Y DIFERENCIE QUE TIPO DE MAIL SE DESEA ENVIAR

    return Axios.post('http://localhost:4000/sendEmail', body) 
        .then((res) => {
            dispatch({ type: SEND_PURCHASE, payload: res.data });
        })
        .catch((error) => {
                console.log(error.message)
        })
}