const { Users } = require("../db.js");

const isAdmin = (req, res, next) => {

    Users.findByPk(req.user.id).then(user => {
        if(user.usertype === "admin") {
            next();
        } else {
            res.status(401).send({ msg: "Unauthorized!" })
        }
    }).catch(err => {
        res.status(401).send({ msg: "Unauthorized" })
    })
}

module.exports = isAdmin;