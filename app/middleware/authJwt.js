const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyToken = (req, res, next) => {
  //   let token = req.headers["x-access-token"];
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(' ')[1];
  console.log('verify token', token);

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const getUserFromToken = (req, res) => {
  const bearerToken = req.headers.authorization;
  let decoded;
  const token = bearerToken.split(' ')[1];
  try {
    decoded = jwt.verify(token, config.secret);
  } catch (err) {
    return res.status(401).send('unauthorized');
  }
  const userId = decoded.id;
  console.log(userId);
  return userId;
};

const authJwt = {
  verifyToken,
  getUserFromToken,
};
module.exports = authJwt;
