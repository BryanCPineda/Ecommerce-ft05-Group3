const server = require("express").Router();
const { Order, Users } = require("../db.js");
const isAdmin = require('../middleware/isAdmin')
const auth = require('../middleware/auth');
const { response } = require("express");

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

// modifica el estado de una orden------------------------------------

server.put('/:id', auth, isAdmin, (req, res, next) => {
  const {state} = req.body.estado
  const {id} = req.params
  Order.findOne(
    { where: { id: id } }
  )
    .then((order) => {
      console.log('datavalues-------', order.dataValues.state)
      console.log('stateeeeee', state)
      order.dataValues.state = state
      order.save().then(response =>
        res.send({ data: response }).status(200))
 
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


module.exports = server;