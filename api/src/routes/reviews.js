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

server.post("/product/:id/review",(req,res)=>{
     const {description,qualification,userId}=req.body
     const {id} = req.params
    
    Reviews.create({
            userId:userId,
            productId:id,
            description:description,
            qualification:qualification
        
    })
    .then((reviews) => {
         
        res.status(200).send(reviews);
      })
      .catch((err) => {
        return res.send({ data: err }).status(400);
      });
})





module.exports = server;