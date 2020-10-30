const server = require("express").Router();
const { Sequelize } = require("sequelize");
const { Reviews, Orderline, Users, Order, Product } = require("../db.js");

server.get("/product/:id/reviews", (req, res) => {
  const id = req.params.id;
  Reviews.findAndCountAll({
    where:{
      productId:id,
    },
    include: {
      model: Users
    }
  })
  .then(review=> res.send(review))
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

server.put("/:idReview", (req, res, next) => {
  /* and this other one is for modifying one existing review */
  const idReview = req.params.idReview;
  const { description, qualification } = req.body; 
  console.log('idReview', idReview)
  console.log('description', description)
  console.log('qualification', qualification)
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

// Match Product-User
server.post('/user/product', async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const review = await Reviews.findOne({
      where: {
        userId: userId,
        productId: productId
      },
    })
    if(!review){
      res.send(`No se encuenta una review del userId ${userId} para el productId ${productId}`)
    }
    res.send(review)
  } 
  catch (err) {
    console.log('reviewERROR', err)
    return res.send({data: err}).status(400);
  }
})
// All reviews from one User
server.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const review = await Reviews.findAll({
      where: {
        userId: userId,
      },
      order: [['productId', 'ASC']]
    })
    if(!review){
      res.send(`El userId ${userId} no tiene reviews`)
    }
    res.send(review)
  } 
  catch (err) {
    console.log('reviewERROR', err)
    return res.send({data: err}).status(400);
  }
})

module.exports = server;
/*server.get("/product/:id/review", (req, res) => {
  const id = req.params.id;
  Reviews.findAndCountAll({
    where:{
      productId:id,
    }
  })
  .then((reviews) => {
    let usersIds = reviews.rows.map(e => e.dataValues.userId)
    let infoUsers=[];
    usersIds.map(id => {
      Users.findOne({
        where:{
          id:id,
        },
        attributes: {
          exclude: ['password']
        }
      })
      .then((user)=>{
        infoUsers.push(user.dataValues)
      })
      .then(() =>{
        if(infoUsers.length === usersIds.length){
          let response = {
            reviews: reviews,
            users: infoUsers
          }
          res.send(response).status(200);
        }
      })
    })
  })
  .catch((err) => {
    return res.send({ data: err }).status(400);
  });
})*/