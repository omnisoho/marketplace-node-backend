const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to marketplace application.' });
});
// authentication routes
require('./app/routes/auth.routes')(app);
// product routes
require('./app/routes/product.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// dev mode drop tables and resync
const db = require('./app/models');
// intial function to create any intial data
function initial() {}
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.');
  initial();
});
