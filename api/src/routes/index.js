const { Router } = require("express");
// import all routers;

const productRouter = require('./product.js');
const categoriesRouter = require('./categories.js');
const imageRouter = require ('./image.js');
const orderRouter = require ('./orders.js');
const userRouter = require ('./users.js');
const authRouter = require ('./auth.js');
const reviewRouter = require ('./reviews.js');
const gitHub = require ('./gitHub-Routes');                 //se importan las rutas para la autenticacion con gitHub
const sendEmail = require('./sendEmail');
const twit_auth = require('./twitter')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use("/products", productRouter);
router.use("/category", categoriesRouter);
router.use("/image", imageRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/reviews", reviewRouter);
router.use("/gitHub", gitHub);                              //se habilitan las rutas de github 
router.use("/sendEmail", sendEmail);
router.use('/twitter', twit_auth)

module.exports = router;
