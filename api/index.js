//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");


const { productsSeeder, categoriesSeeder , imageSeeder, categoy_productSederr, usersSeeder, reviews_productSeeder, reviewsSeeder } = require('./src/seeder.js')


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {

  usersSeeder();  //se genera el usuario administrador para testing

/**** FUNCIONES QUE GENERAN DATOS AUTOMATICOS EN LA DB ******* */
// DESCOMENTAR LOS 'seeders' para llenar automaticamente la base de datos
//  productsSeeder();
//  categoriesSeeder();
//  imageSeeder();
//  categoy_productSederr(); 
//  reviews_productSeeder(); 
//  reviewsSeeder(); 
  
  server.listen(4000, () => {
    console.log("%s listening at 4000"); // eslint-disable-line no-console
  });
});