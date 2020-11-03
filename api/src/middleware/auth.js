const jwt = require("jsonwebtoken");
const { DB_KEY } = process.env;


const auth = (req, res, next) => {                       //middleware
    let token = req.header("x-auth-token");              //chequeo si el usuario esta autorizado o sea si me envia el token en el header
    if(!token) token = req.body.headers["x-auth-token"]  
    if(!token) return res.status(401).send({ msg: 'No token, authorization denied' }) //si no tiene el token no tiene autorizacion

    try {
        const decoded = jwt.verify(token, DB_KEY)  //"deshashea el token" lo compara con la palabra secreta
        console.log(decoded)
        req.user = decoded;    //guardo en req.user el id del usuario (porque eso es lo que tiene adentro el token)
        next();
    } catch (error) {
        res.status(400).send({ msg: "token is not valid"})
    }
}


module.exports = auth;