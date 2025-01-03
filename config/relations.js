// models/relations.js
const defineRelations = (db) => {
  // ! relations between categories and products
  db.Category.hasMany(db.Product, {
    foreignKey: 'category_id',
    sourceKey: 'id',
    as: 'products'
  });

  db.Product.belongsTo(db.Category, {
    foreignKey: 'category_id',
    targetKey: 'id',
    as: 'categories'
  });

  // ! relations between products and images
  db.Product.hasMany(db.ProductImage, {
    foreignKey: 'product_id',
    as: 'images',
  });


  db.ProductImage.belongsTo(db.Product, {
    foreignKey: 'product_id',
    as: 'product',
  });

  // ! relations between provinces and cities
  db.Province.hasMany(db.City, {
    foreignKey: 'province_id',
    sourceKey: 'id',
    as: 'cities'
  });

  db.City.belongsTo(db.Province, {
    foreignKey: 'province_id',
    targetKey: 'id',
    as: 'provinces'
  });

  // ! relations between orders and total_prices
  db.Order.belongsTo(db.TotalPrice, {
    foreignKey: 'total_price_id',
    targetKey: 'id',
    as: 'total_price'
  });

  db.TotalPrice.hasMany(db.Order, {
    foreignKey: 'total_price_id',
    sourceKey: 'id',
    as: 'orders'
  });

  db.Order.belongsTo(db.Product, {
    foreignKey: 'product_id',
    sourceKey: 'id',
    as: 'product' });

  db.TotalPrice.belongsTo(db.Address, {
    foreignKey: 'address_id',
    as: 'address' });

  db.Address.belongsTo(db.City, { foreignKey: 'city_id', as: 'city' });
  db.Address.belongsTo(db.Province, { foreignKey: 'province_id', as: 'province' });
  db.Address.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });


};

export default defineRelations;
