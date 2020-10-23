const server = require("express").Router();
const { Reviews, Product, Users } = require("../db.js");


server.get("/product/:id/review", (req, res) => {
  const id = req.params.id;
  Reviews.findAndCountAll({
    where:{
      productId:id,
    },
    // include: [{
    //   model: Users,
    // }]
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

server.put("/:id", (req, res, next) => {
  /* and this other one is for modifying one existing review */
  const { idReview } = req.params;
  const {
    description,
    qualification,
  } = req.body; 
  Reviews.update(
    {
      description: description,
      qualification: qualification,
    },
    { where: { id:idReview } }
  )
    .then((value) => {
      const result = value[0];
      if (result) {
        return res.send("Element updated").status(202);
      }
      return res.send("Review not found!").status(400);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

server.delete('/:id', (req, res)=>{
  const {id} = req.params;
  Reviews.destroy({
    where: {
      id: id
    }
  }).then((review)=>{
    if (review) {  
      return res.send("Review Deleted");          
    }
    return res.send({ data: "Review not found!" }).status(400);
    
  }).catch(err => res.send({data: err}).status(400));
})

module.exports = server;