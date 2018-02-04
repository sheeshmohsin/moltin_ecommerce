const authApi = require('auth-api');
const app = require('express')();
const moltin = require('@moltin/sdk');
const config = require('./config');
const middleware = require('./middleware');
const views = require('./views');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/moltin');

var userConfig = {
  APP_NAME: 'Moltin Ecommerce',
  SECRET: 'moltim',                             // jwt secret 
  CLIENT_TOKEN_EXPIRES_IN: 60 * 24 * 60 * 60,     // client token expires time(60day) 
  EMAIL_TOKEN_EXPIRES_IN: 24 * 60 * 60,           // email token expires time(24h) 
 
  EMAIL_SENDER: {                                 // used to send mail by nodemailer 
    service: 'Gmail',
    auth: {
      user: config.EmailHostUser,
      pass: config.EmailHostPassword
    }
  },
 
  USER_MESSAGE: {                                 // message sent to client 
    MAIL_SENT: 'mail sent',
    NAME_TAKEN: 'Name or email has been taken',
    USER_NOT_FOUND: 'User not found',
    WRONG_PASSWORD: 'wrong password',
    LOGIN_SUCCESS: 'Enjoy your token!',
    NEED_EMAIL_VERIFICATION: 'You need to verify your email first',
  },
 
  API_URL: 'http://localhost:8000'              // to be used in the mail 
};

authApi.init(userConfig);

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(middleware.MoltinAuth);
app.use(middleware.crossOrigin);

app.use('/', authApi.authRouter);

app.get('/products', (req, res) => {
    views.getProducts(req, res);
});

app.get('/cart', (req, res) => {
    views.getCartItems(req, res);
});

app.post('/removeItemFromCart', (req, res) => {
	views.removeItemFromCart(req, res);
});

app.post('/addtocart', (req, res) => {
	views.addToCart(req, res);
});


app.get('/checkout', (req, res) => {
	views.checkout(req, res);
});

app.get('/payment', (req, res) => {
	views.payment(req, res);
})

app.listen(8000, function(){
    console.log('Ecommerce moltin app');
    // console.log(config.ClientID);
    // console.log(config.ClientSecret);
});
