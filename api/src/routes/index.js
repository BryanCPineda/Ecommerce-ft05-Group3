const { Router } = require("express");
// import all routers;

const productRouter = require('./product.js');
const categoriesRouter = require('./categories.js');
const imageRouter = require ('./image.js');
const orderRouter = require ('./orders.js');
const userRouter = require ('./users.js');
const reviewRouter = require ('./reviews.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use("/products", productRouter);
router.use("/category", categoriesRouter);
router.use("/image", imageRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewRouter);


module.exports = router;
