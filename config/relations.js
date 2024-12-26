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
    as: 'total_prices'
  });

  db.TotalPrice.hasMany(db.Order, {
    foreignKey: 'total_price_id',
    sourceKey: 'id',
    as: 'orders'
  });

};

export default defineRelations;
