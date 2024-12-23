import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';

// ! imports models
import User from './User.js';
import RefreshToken from './RefreshToken.js';
import Product from './Product.js';
import Category from './Category.js';
import ProductImage from './ProductImage.js';
import defineRelations from '../config/relations.js';

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

// ! relations
defineRelations(db)


export default db;