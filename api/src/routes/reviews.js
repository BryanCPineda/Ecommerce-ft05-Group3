const server = require("express").Router();

const { Reviews, Product } = require("../db.js");


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


server.delete('/product/:id/review/:idReview', (req, res)=>{
  const {id, idReview} = req.params;
  Reviews.destroy({
    where: {
      id: idReview,
      productId:id
    }
  }).then((review)=>{
    if (review) {  
      return res.send("Review Deleted");          
    }
    return res.send({ data: "Review not found!" }).status(400);
    
  }).catch(err => res.send({data: err}).status(400));
})

module.exports = server;

