const server = require("express").Router();
const { Product, Orderline, Order, Users,  } = require("../db.js");
const { Sequelize } = require('sequelize')

server.get('/', (req, res, next) => { 
    Users.findAll()
    .then((users) => {
      res.status(200).json(users);
    }).catch((err)=>{
      return res.send({data: err}).status(400)
    })
  })

server.post('/', async (req, res)=>{
  try {
    const { name, lastName, email, password, userType, image, adress } = req.body;
    if(!name || !lastName || !email || !password || !adress){
      res.send('All fields must to be completed')
    }
    const user = await Users.findOne({
      where: {
        email: email
      }
    })
    if(user){
      return res.send('This user already exists, choose a different one!').status(100);
    }
    const createUser = await Users.create({
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        userType: userType,
        adress: adress,
        image: image
    })
    console.log('FIND_OR_CREATE', createUser)
    return res.send(createUser)
  } 
  catch (err) {
    res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
  }
})

server.put('/:id', (req, res)=>{
  const { id } = req.params;
  const {
    name,
    lastName,
    email,
    password,
    adress,
    image
  } = req.body; /* <--- THE ELEMENT OF THE BODY WE ARE GOING TO USE FOR THE UPDATE */
  Users.update(
    {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      adress: adress,
      image: image
    } /* <----THE ATRIBUTES WE WANT TO UPDATE */,
    { where: { id: id } }
  )
    .then((value) => {
      console.log('el value', value)
      const result = value[0];
      if (result) {
        return res.status(202).send("Element updated");
      }
      return res.status(400).send("User not found!");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.put('/:userId/cart', async (req, res)=>{
  // S41-Crear-Ruta-para-editar-las-cantidades-del-carrito
  // PUT /users/:idUser/cart
  const id = req.params.userId;                           // Me llega el userId desde el login.
  const { orderlineId, orderlineQuantity } = req.body;    // Se trigerean desde el body los campos de la Orderline
  try {
    const order = await Order.findOne({                   // Obtengo la orden del usuario
      where: {
        userId: id,
        state: 'Cart'
      }
    })  
    console.log('ORDER', order)
    if (order) {                                          // Si existe (siempre debería) me traigo todas las orderlines que contenga
      const orderID = order.id;
      const userOrderlines = await Orderline.findAll({    // Devuelve un array con todas las orderlines de esa orden
        where: {
          orderId: orderID
        }
      })
    // Acá comienza la fiesta ...                         // Acá se modificarán las cantidades (orderlineQuantity) de esa orderline (orderlineId)
    }
  } 
  catch (err) {
    return res.send({ data: err }).status(400);
  }
})

module.exports = server;