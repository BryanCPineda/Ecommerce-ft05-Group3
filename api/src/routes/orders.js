const server = require("express").Router();
const { Order } = require("../db.js");

server.get('/', (req, res, next) => {
const state = req.query.status;   
  Order.findAll({
    where: {
      state: state
    }
  })
  .then((orders) => {
    const ordenes=orders[0]
    if(ordenes){
      res.status(200).json(ordenes);
    }
    res.status(404).send('Order not found!')
    
  }).catch((err)=>{
    return res.send({data: err}).status(400)
  })
})

server.put('/:id', (req, res, next) => {
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

module.exports = server;