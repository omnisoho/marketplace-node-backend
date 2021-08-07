const db = require('../models');
const { authJwt } = require('../middleware');

const getUser = authJwt.getUserFromToken;
const Product = db.products;
const { Op } = db.Sequelize;

const User = db.user;

// Create and Save a new Product
const create = (req, res) => {
  console.log('req', req.body);
  console.log('headers auth', req.headers.authorization);

  const userId = getUser(req);

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  User.findOne({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      // Create a Product
      const product = {
        name: req.body.name,
        description: req.body.description,
        datePublished: Date.now(),
        price: req.body.price,
        imageUrl: req.body.imageUrl ? req.body.imageUrl : null,
        userId: user.id,
      };

      // Save Product in the database
      Product.create(product)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the Product.',
          });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// find all mine
const findAll = (req, res) => {
  console.log('findAllMine');
  const userId = getUser(req);

  const { name } = req.query;
  // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const condition1 = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const condition2 = userId ? { userId } : null;
  const condition = { [Op.and]: [condition1, condition2] };

  Product.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occurred while retrieving products.',
      });
    });
};

// find all others
const findAllOthers = (req, res) => {
  console.log('findAllOthers');
  const userId = getUser(req);

  const { name } = req.query;
  // var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const condition1 = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const condition2 = userId ? { userId: { [Op.not]: userId } } : null;
  const condition = { [Op.and]: [condition1, condition2] };

  Product.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occurred while retrieving products.',
      });
    });
};

module.exports = {
  create,
  findAll,
  findAllOthers,
};