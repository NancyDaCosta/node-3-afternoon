const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

//Middleware
const checkForSession = require('./middlewares/checkForSession')

//Controllers
const swagController = require('./controllers/swag_controller')
const authController = require('./controllers/auth_controller')
const cartController = require('./controllers/cart_controller')
const searchController = require('./controllers/search_controller')

const app = express();

app.use( bodyParser.json() );
app.use(session({
  secret: 'string',
  resave: false,
  saveUninitialized: true
}))

app.use(checkForSession);
app.use( express.static( `${__dirname}/../build` ) );

//Swag
app.get( "/api/swag", swagController.read);

//Auth
app.post( '/api/login', authController.login );
app.post( '/api/register', authController.register);
app.post( '/api/signout', authController.signout);
app.get( '/api/user', authController.getUser);

//Cart
app.post( '/api/cart', cartController.add );
app.post( '/api/cart/checkout', cartController.checkout );
app.delete( '/api/cart', cartController.delete);

//Search
app.get( '/api/search', searchController.search);

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Server listen on port ${port}.`); } );