const server = require("express").Router();
const { Sequelize } = require("sequelize");
const { Reviews, Orderline, Users, Order, Product } = require("../db.js");


server.get("/product/:id/review", (req, res) => {
  const id = req.params.id;
  Reviews.findAndCountAll({
    where:{
      productId:id,
    },
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
})
// This function brings necesary data for the ReviewCard component
server.get('/:userId/products', async (req, res)=>{
  try {
    const userId = req.params.userId;
    const orders = await Order.findAll({
      where: {
        userId: userId
      },
    })
    let orderIds = orders.map(order=>order.dataValues.id);
    console.log('orders', orders)
    let userOrderlines = await Orderline.findAndCountAll({
      where: {
        orderId: orderIds
      }  
    })
    let productIds = userOrderlines.rows.map(orderLine=>orderLine.dataValues.productId)
    // let products = await Product.findAndCountAll({
    //   where: {
    //     id: productIds
    //   },
    // })
    let reviews = await Reviews.findAndCountAll({
      where: {
        productId: productIds,
        userId: userId
      },
      // include: {
      //   model: Product,
      //   where: {
      //     id: Sequelize.col('reviews.productId')
      //   }
      // }
    })
    let reviewQualification = reviews.rows.map(e => e.dataValues.qualification)
    let reviewDescription = reviews.rows.map(e => e.dataValues.description)
    let productNames = products.rows.map(e => e.dataValues.name)
    let productId = products.rows.map(e => e.dataValues.id)
    let productPrices = products.rows.map(e => e.dataValues.price)

    // console.log('reviewQualification', reviewQualification)
    // console.log('reviewDescription', reviewDescription)
    // console.log('productIds', productId)
    // console.log('productNames', productNames)
    // console.log('productPrices', productPrices)
    res.send(reviews)
  } 
  catch (err) {
    return res.send({ data: err }).status(400);
  }
})
// server.get('/:userId/products', async (req, res)=>{
//   try {
//     const userId = req.params.userId;
//     const orders = await Reviews.findAll({
//       where: {
//         userId: userId
//       },
//       attributes: ['qualification', 'description'],
//       include: {
//         model: Order,
//         where: {
//           userId: userId
//         },
//         include: {
//           model: Orderline,
//           where: {
//             orderId: Order.id
//           },
//           attributes: ['name', 'price'],
//           include: {
//             model: Product,
//             where: {
//               productId: Orderline.productId
//             }
//           }
//         }
//       }
//     })
//     // console.log('reviews', reviews)
//     res.send(orders)
//   } 
//   catch (err) {
//     return res.send({ data: err }).status(400);
//   }
// })
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