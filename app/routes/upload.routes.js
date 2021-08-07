const express = require('express');

const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const upload = require('../middleware/upload');

const routes = (app) => {
  router.post('/upload', upload.single('file'), uploadController.uploadFiles);

  return app.use('/api', router);
};

module.exports = routes;
