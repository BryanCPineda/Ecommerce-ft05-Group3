const server = require("express").Router();
const { Product, Categories, Image, Users, Order, Orderline } = require("../db.js");
const { Sequelize } = require("sequelize");

server.get('/', (req, res, next) => { 
    Users.findAll()

    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.post("/", (req, res) => {
  const { name, lastName, email, password, userType, image, adress } = req.body;
  console.log("REQUEST", req.body);
  Users.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return Users.create({
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          userType: userType,
          adress: adress,
          image: image,
        });
      }
      return res
        .send("This user already exists, choose a diferent one!")
        .status(100);
    })
    .then((user) => {
      console.log("USERCREATED", user);
      return res.send(user);
    })
    .catch(() => {
      res.send({ data: err }).status(400); // Show proper error in DevTool to the FrontEnd guys.
    });
});

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
