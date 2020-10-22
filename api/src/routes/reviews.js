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

server.post("/product/:id/review",(req,res)=>{
     const {description,qualification,userId}=req.body
     const {id} = req.params
    //  const iD = req.params.id
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

server.put("/product/:id/review/:idReview", (req, res, next) => {
  /* and this other one is for modifying our existing routes :O */
  const { id,idReview } = req.params;
  const {
    description,
    qualification,
  } = req.body; 
  Reviews.update(
    {
      description: description,
      qualification: qualification,
    },
    { where: { productId: id, id:idReview } }
  )
    .then((value) => {
      const result = value[0];
      if (result) {
        return res.status(202).send("Element updated");
      }
      return res.status(400).send("Reviews not found!");
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

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
