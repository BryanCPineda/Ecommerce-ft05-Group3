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
    res.status(200).json(orders);
  }).catch((err)=>{
    return res.send({data: err}).status(400)
  })
})

module.exports = server;