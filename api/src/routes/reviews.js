const server = require("express").Router();
const { Reviews } = require("../db.js");

server.get("/product/:id/review", (req, res) => {
    const id = req.params.id;
    console.log(id)
    
    Reviews.findAndCountAll({
        where:{
            productId:id,    
            
        }
    })
    .then((reviews) => {
        res.status(200).send(reviews);
      })
      .catch((err) => {
        return res.send({ data: err }).status(400);
      });
})

server.get('/product/:id/oneStarReviews', async (req, res)=>{
  try {
    const {id} = req.params;
    const reviews = await Reviews.findAndCountAll({
      where: {
        productId: id,
        qualification: '1'
      }
    })
    return res.send(reviews);
  } catch (err) {
    return res.send({ data: err }).status(400);
  }
})
server.get('/product/:id/twoStarsReviews', async (req, res)=>{
  try {
    const {id} = req.params;
    const reviews = await Reviews.findAndCountAll({
      where: {
        productId: id,
        qualification: '2'
      }
    })
    return res.send(reviews);
  } catch (err) {
    return res.send({ data: err }).status(400);
  }
})
server.get('/product/:id/threeStarsReviews', async (req, res)=>{
  try {
    const {id} = req.params;
    const reviews = await Reviews.findAndCountAll({
      where: {
        productId: id,
        qualification: '3'
      }
    })
    return res.send(reviews);
  } catch (err) {
    return res.send({ data: err }).status(400);
  }
})
server.get('/product/:id/fourStarsReviews', async (req, res)=>{
  try {
    const {id} = req.params;
    const reviews = await Reviews.findAndCountAll({
      where: {
        productId: id,
        qualification: '4'
      }
    })
    return res.send(reviews);
  } catch (err) {
    return res.send({ data: err }).status(400);
  }
})
server.get('/product/:id/fiveStarsReviews', async (req, res)=>{
  try {
    const {id} = req.params;
    const reviews = await Reviews.findAndCountAll({
      where: {
        productId: id,
        qualification: '5'
      }
    })
    return res.send(reviews);
  } catch (err) {
    return res.send({ data: err }).status(400);
  }
})

module.exports = server;