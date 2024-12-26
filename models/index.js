import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';
import defineRelations from '../config/relations.js';

// ! imports models
import User from './User.js';
import RefreshToken from './RefreshToken.js';
import Product from './Product.js';
import Category from './Category.js';
import ProductImage from './ProductImage.js';
import Province from './Province.js';
import City from './City.js';
import Order from './Orders.js';
import Address from './Address.js';
import TotalPrice from './TotalPrice.js';

const conf = config.development;

const sequelize = new Sequelize(
  conf.database,
  conf.username,
  conf.password,
  { host: conf.host, dialect: conf.dialect , logging: conf.logging, timezone: conf.timezone}
);

sequelize.sync({ alter: true });

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// ! table definitions
db.User = User(sequelize, DataTypes);
db.RefreshToken = RefreshToken(sequelize, DataTypes);
db.Category = Category(sequelize, DataTypes);
db.Product = Product(sequelize, DataTypes);
db.ProductImage = ProductImage(sequelize, DataTypes);
db.Province = Province(sequelize, DataTypes);
db.City = City(sequelize, DataTypes);
db.Order = Order(sequelize, DataTypes);
db.Address = Address(sequelize, DataTypes);
db.TotalPrice = TotalPrice(sequelize, DataTypes);


// ! relations
defineRelations(db)


export default db;