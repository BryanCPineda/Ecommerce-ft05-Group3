const server = require("express").Router();
const { Reviews } = require("../db.js");

server.get("/product/:id/review", (req, res) => {
    const {id} = req.params;
    
    Reviews.findAll({
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