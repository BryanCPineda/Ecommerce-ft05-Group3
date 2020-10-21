const jwt = require("jsonwebtoken");
const { DB_KEY } = process.env;

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if(!token) return res.status(401).send({ msg: 'No token, authorization denied' })

    try {
        const decoded = jwt.verify(token, DB_KEY)
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ msg: "token is not valid"})
    }
}

module.exports = auth;