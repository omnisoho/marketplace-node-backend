const router = require('express').Router();
const products = require('../controllers/product.controller');
const { authJwt } = require('../middleware');

module.exports = (app) => {
  // Create a new Product
  router.post('/', [authJwt.verifyToken], products.create);

  // Retrieve all Products
  router.get('/', [authJwt.verifyToken], products.findAll);

  // Retrieve all Others Products
  router.get('/search', [authJwt.verifyToken], products.findAllOthers);

  app.use('/api/products', router);
};
