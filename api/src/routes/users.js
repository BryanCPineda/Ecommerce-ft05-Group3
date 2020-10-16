const server = require("express").Router();
const { Product, Categories, Image, Users, Order, Orderline } = require("../db.js");
const { Sequelize } = require("sequelize");
const { check, validationResult, body } = require("express-validator");


server.get("/", (req, res, next) => {
  Users.findAndCountAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});


server.post(
  "/",
  [
    check("name")
      .isLength({ min: 2, max: 30 })
      .withMessage("Name must have at least 2 characters"),
    check("lastName", "Lastname is empty")
      .isLength({ min: 2, max: 50 })
      .withMessage("Lastname must have at least 2 characters"),
    check("email")
      .isEmail()
      .withMessage("Invalid Email"),
    check("password")
      .isLength({ min: 8, max: 50 })
      .withMessage("Password must have at least 8 characters"),
  ],
  async (req, res) => {
    try {
      const {name, lastName, email, password } = req.body;

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((ele) => ele.msg) });
    }

    const user = await Users.findOne({ where: { email: email}})

    if(user) {
      return res.status(400).json({ errors: ["User already exists!"] });
    }
    
    const userCreate = await Users.create({ name, lastName, email, password })

    res.status(200).send(userCreate)
    } catch (error) {
      console.log(error)
    }
  })
  

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    lastName,
    email,
    password,
    adress,
    image,
  } = req.body; /* <--- THE ELEMENT OF THE BODY WE ARE GOING TO USE FOR THE UPDATE */
  Users.update(
    {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      adress: adress,
      image: image,
    } /* <----THE ATRIBUTES WE WANT TO UPDATE */,
    { where: { id: id } }
  )
    .then((value) => {
      console.log("el value", value);
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
    if (order) {                                          // Si existe (siempre debería) me traigo todas las orderlines que contenga
      const orderID = order.id;
      const userOrderlines = await Orderline.findAll({    // Devuelve un array con todas las orderlines de esa orden
        where: {
          orderId: orderID
        }
      })
      // Acá se modificarán las cantidades (orderlineQuantity) de esa orderline (orderlineId)
      const orderlineToChange = await Orderline.findByPk(orderlineId);
      const product = await 
        Product.findOne({
          where: {
            id: orderlineToChange.productId
          }
        })
      if(orderlineQuantity > product.stock){
        return res.send(`You reached the maximun stock, you can buy till ${product.stock} items.`)
      }
      product.stock -= orderlineQuantity;
      const updatedProduct = await product.save();
      orderlineToChange.quantity = Number(orderlineQuantity);
      return res.send(orderlineToChange);
    }
  } 
  catch (err) {
    return res.send({ data: err }).status(400);
  }
})

server.get("/:idUser/cart", async (req, res) => {
  try {
    const { idUser } = req.params;
    const orderUser = await Order.findOne({ where: { userId: idUser, state: 'Cart' }})
    const orderLines = await Orderline.findAll({
      where: { orderId: orderUser.dataValues.id }
    });
    return res.status(200).send(orderLines)
  } catch (error) {
    return res.status(400).send({ data: error });
  }
});

server.post("/:idUser/cart", async (req, res) => {
  try {
    const { idUser } = req.params;
    const { quantity, productId } = req.body;
    const order = await Order.findOrCreate({
      where: { userId: idUser, state: "Cart" },
    });
    
    const product = await Product.findByPk(productId);
    product.stock = product.stock - quantity;
    const productSave = await product.save();

    const orderLine = await Orderline.create({
      price: product.price,
      quantity: quantity,
      orderId: order[0].dataValues.id,
      productId: productId,
    });
    // console.log(order.dataValues)
    // console.log(order)
    return res.status(200).send(orderLine);
  } catch (error) {
    return res.status(400).send({ data: error });
  }
});

//Vaciar el carrito
server.delete("/:idUser/cart", async (req, res) => {
  try {
    const { idUser } = req.params;
    const orderUser = await Order.findOne({ where: { userId: idUser, state: 'Cart' }})
    if(!orderUser) {
      res.send("La orden para el usuario  " + idUser + ",no fue encontrada");
      return;
    }

    const orderLine = await Orderline.findAll({
      where: { orderId: orderUser.dataValues.id },
    });

    for(let i=0; i < orderLine.length; i++) {
      const product = await Product.findByPk(orderLine[i].dataValues.productId)
      product.stock = product.stock + orderLine[i].dataValues.quantity;
      const productSave = await product.save();
    }

    const orderDeleted = await orderUser.destroy()
    res.status(200).send("Cart is empty")
  } catch (error) {
    return res.status(400).send({ data: error });
  }
});

//Quitar un item del carrito
server.delete("/:idUser/cart/:itemId", async (req, res) => {
  try {
    const { idUser, itemId } = req.params;
    const orderUser = await Order.findOne({ where: { userId: idUser, state: 'Cart' }})
    if(!orderUser) {
      res.send("La orden para el usuario  " + idUser + ",no fue encontrada");
      return;
    }
  
    const orderLine = await Orderline.findOne({
      where: { orderId: orderUser.dataValues.id },
    });

    const product = await Product.findByPk(orderLine.dataValues.productId);
    product.stock = product.stock + orderLine.dataValues.quantity;
    const productSave = await product.save();
    
    if(orderLine) {
      const orderDeleted = await orderLine.destroy({ where: { productId: itemId}})
      res.status(200).send("Item Deleted")
    } else {
      res.status(400).send("Orderline does no exists")
    }
    
  } catch (error) {
    return res.status(400).send({ data: error });
  }
});

// server.delete("/:idUser/cart", (req, res) => {
//   const idUser = req.params.idUser;

//   Order.findOne({ where: { userId: idUser, state: "Cart" } }).then((order) => {
//     if (!order) {
//       res.send("La orden para el usuario  " + idUser + ",no fue encontrada");
//       return;
//     }
//     let orderId = order.id;
//     Orderline.findAll({
//       where: {
//         orderId: orderId,
//       },
//     }).then(() => {
//       Orderline.destroy({
//         where: {
//           orderId: orderId,
//         },
//       })
//         .then(() => {
//           return res.send("Se ha vaciado la orden");
//         })
//         .catch((error) => {
//           return res.send(error).status(500);
//         });
//     });
//   });
// });

// server.put("/:idUser/cart")

module.exports = server;
