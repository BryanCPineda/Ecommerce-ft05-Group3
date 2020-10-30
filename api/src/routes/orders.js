const server = require("express").Router();
const { Order, Users } = require("../db.js");
const isAdmin = require('../middleware/isAdmin')
const auth = require('../middleware/auth')

server.get('/', (req, res, next) => {
 
  Order.findAll({
    include:[
      {
        model: Users
      }
    ]
  })
  .then((orders) => {
    res.send(orders).status(200);
    }  
    ).catch((err)=>{
    return res.send({data: err}).status(400)
  })
})

server.put('/:id', auth, isAdmin, (req, res, next) => {
  const {state} = req.body
  const {id} = req.params
  Order.update(
    {
      state: state
    }, 
    { where: { id: id } }
  )
    .then((value) => {
      const result = value[0];
      if (result) {
        return res.status(202).send("Element updated");
      }
      return res.status(400).send("Order not found!");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
})

// ruta para finalizar la compra del carrito----------------------------------------------
server.put('/checkout/:id', (req, res) => {
  const {state, totalPrice} = req.body
  const {id} = req.params
  console.log('cambio estado carrito', req.body)
  Order.update(
    {
      state: state,
      totalPrice: totalPrice
    }, 
    { where: { id: id } }
  )
    .then((value) => {
      console.log('result', value)
      const result = value[0];
      if (result) {
        return res.status(202).send("Element updated");
      }
      return res.status(400).send("Order not found!");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
})

server.get("/:id", (req,res)=>{
  const {id} = req.params;
  Order.findAll({
    where: {
      id: id
    }
  })
  .then((order) => {
    console.log(order)
    const orderId= order;
    if(orderId){
      return res.status(200).json(order);
    }
    return res.status(400).send("Order not found!");
  }).catch((err)=>{
    return res.send({data: err}).status(400);
  });
})

server.delete('/:id', auth, isAdmin, (req, res)=>{
    const {id} = req.params;
    Order.findOne({
      where: {
        id: id
      }
    }).then((order)=>{
          order.destroy();
          res.send("Order Deleted")
    }).catch(err => res.send({data: err}).status(400));
})

server.post('/:state', async (req, res) => {
  try {
    const { state } = req.params;
    console.log(state)
    const orders = await Order.findAll({
      where: {
        state: state
      },
      include:[
        {
          model: Users
        }
      ]
    })
    if(orders)res.send(orders)
  } 
  catch (err) {
    return res.send({data: err}).status(400)
  }
})

module.exports = server;