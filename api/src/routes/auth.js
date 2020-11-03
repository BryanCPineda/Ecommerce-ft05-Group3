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

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
//login
server.post(
  "/",
  [
    check("email").isEmail().withMessage("Invalid Email"),    //valido solo mail y password con express-validator
    check("password")
      .isLength({ min: 8, max: 50 })
      .withMessage("Password must have at least 8 characters"),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);           //valido todo el req body con la libreria express-validator
                                                      // que use al principio y si hay errores me crea un array
      if (!errors.isEmpty()) {                                  
        return res
          .status(400)
          .json({ errors: errors.array().map((ele) => ele.msg) });   // con esos errores y los mapeo para mostrarlos en el front
      }

      const user = await Users.findOne({ where: { email: email } });

      if (!user) {                                            //chequeo si el usuario no existe para decirle que se registre
        return res.status(400).json({ errors: ["User does not exists!"] });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ errors: ["Invalid credentials"] }); //comparo la password de la base de datos con la que me envia
      }                                                                   //si es incorrecta le digo que las credenciales son invalidas
      jwt.sign(                         //creo el token mediante la firma
          { id: user.id },              //guardo el id del usuario en el token
          DB_KEY,                       //la palabra secreta para hashearlo
          { expiresIn: '1d' },           //el tiempo de expiracion
          ((err, token) => {            //un callback con un error y el token
              if(err) throw err         //si hubo error muestro el error sino envio el token
              res.send({                 //mando el token al front y los datos del usuario
                  token,
                  user: {
                  id: user.id,
                  name: user.name,
                  lastname: user.lastname,
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
server.get("/", auth, (req, res) => {             //esta ruta se utiliza para que cada vez que yo recargue la pagina
                                                  //con un useffect voy a dispachar esta accion
  Users.findByPk(req.user.id).then(user => {      //lo que hace es econtrar el usuario por id, este id proviene del middleware
    res.send({                                    //tienen que mirar primero como funciona el middleware antes de esta funcion
        id: user.id,                              //devuelvo todos los datos del usuario
        name: user.name,                          //entonces si yo cierro la pagina o relodeo con esto se me va a loguear automaticamente
        lastname: user.lastname,                  //en el caso de que el token no halla expirado
        email: user.email,
        rol: user.usertype
    })
    .catch(err => console.log(err))
  })
})

//Promote User
server.post("/promote", auth, (req, res) => {
  Users.update(
    {
      usertype: "admin",
    },
    {
      where: { id: req.body.id },
    }
  )
    .then(() => {
      res.send("User has been Promote").status(200);
    })
    .catch((err) => {
      res.send({ data: err }).status(500);
    });
});

module.exports = server;
