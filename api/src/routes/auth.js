const server = require("express").Router();
const {
  Product,
  Categories,
  Image,
  Users,
  Order,
  Orderline,
} = require("../db.js");
const { Sequelize } = require("sequelize");
const { check, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DB_KEY } = process.env;

const auth = require('../middleware/auth')

//login
server.post(
    "/",
    [
      check("email")
        .isEmail()
        .withMessage("Invalid Email"),
      check("password")
        .isLength({ min: 8, max: 50 })
        .withMessage("Password must have at least 8 characters"),
    ],
    async (req, res) => {
      try {
        const { email, password } = req.body;
  
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((ele) => ele.msg) });
      }
  
      const user = await Users.findOne({ where: { email: email}})
  
      if(!user) {
        return res.status(400).json({ errors: ["User does not exists!"] });
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if(!passwordMatch) {
        return res.status(400).json({ errors: ["Invalid credentials"] });
      }

      jwt.sign(
          { id: user.id },
          DB_KEY,
          { expiresIn: '1d' },
          ((err, token) => {
              if(err) throw err
              res.send({
                  token,
                  user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  rol: user.usertype
                  }
              })

          })
      )
      } catch (error) {
        console.log(error)
      }
    })

//authenticate
server.get("/", auth, (req, res) => {

  Users.findByPk(req.user.id).then(user => {
    res.send({
        id: user.id,
        name: user.name,
        email: user.email,
        rol: user.usertype
    })
    .catch(err => console.log(err))
  })
})

//Promote User
server.post('/promote', auth, (req, res)=>{

    Users.update({
      usertype: "admin" 
    },  { 
          where: { id: req.user.id }
        } 
    )
      .then(()=>{
          res.send("User has been Promote to Admin").status(200)
      }).catch(err =>{
          res.send({data: err}).status(500);
      })


})


module.exports = server;