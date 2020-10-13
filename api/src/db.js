require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product } = sequelize.models;
const { Categories } = sequelize.models;
const { Image } = sequelize.models;
const { Order } = sequelize.models;
const { User } = sequelize.models;
const { Orderline } = sequelize.models;


// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Product.belongsToMany(Categories, { through: "category_product" });
Categories.belongsToMany(Product, { through: "category_product" });
Product.belongsToMany(Order, { through: { model: Orderline }, foreignKey: 'productId' });
Order.belongsToMany(Product, { through: { model: Orderline }, foreignKey: 'orderId' });

Product.hasMany(Image,{foreignKey:'productId'});
User.hasMany(Order, { foreignKey: 'userId' });

Order.belongsTo(User, {foreignKey: 'userId'});


Users.hasMany(Order, {foreignKey: 'usersId'});
Order.belongsToOne(Users);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
