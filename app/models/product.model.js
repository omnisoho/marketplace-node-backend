module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    datePublished: {
      type: Sequelize.DATE,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM('Available', 'Sold'),
      defaultValue: 'Available',
    },
  });

  return Product;
};
