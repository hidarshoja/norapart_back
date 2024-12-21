// models/relations.js
const defineRelations = (db) => {
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
      
      db.Product.hasMany(db.ProductImage, {
        foreignKey: 'product_id', 
        as: 'images',
      });
      
      
      db.ProductImage.belongsTo(db.Product, {
        foreignKey: 'product_id', 
        as: 'product',
      });
  };
  
  export default defineRelations;
  