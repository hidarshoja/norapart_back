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
import IpAddress from "./IpAddress.js";
import Question from "./Question.js";
import Blog from "./Blog.js";
import BlogComment from "./BlogComment.js";
import BlogReplyComment from "./BlogReplyComment.js";
import ProductComment from "./ProductComment.js";
import Contact from "./Contact.js";
import Notification from './Notification.js';
import Option from './Option.js';
import Suggestion from "./Suggestion.js";
import SuggestionList from "./SuggestionList.js";
import Payment from "./Payment.js";
import Request from "./Request.js";

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
db.IpAddress = IpAddress(sequelize,DataTypes)
db.Question = Question(sequelize, DataTypes)
db.Blog = Blog(sequelize, DataTypes)
db.BlogComment = BlogComment(sequelize, DataTypes)
db.BlogReplyComment = BlogReplyComment(sequelize, DataTypes)
db.ProductComment = ProductComment(sequelize, DataTypes)
db.Contact = Contact(sequelize, DataTypes)
db.Notification = Notification(sequelize, DataTypes)
db.Option = Option(sequelize, DataTypes)
db.Suggestion = Suggestion(sequelize, DataTypes)
db.SuggestionList = SuggestionList(sequelize, DataTypes)
db.Payment = Payment(sequelize, DataTypes)
db.Request = Request(sequelize, DataTypes)

// ! relations
defineRelations(db)


export default db;