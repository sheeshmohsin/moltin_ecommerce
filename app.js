const app = require('express')();
const moltin = require('moltin');
const config = require('./config');
const middleware = require('./middleware');
const views = require('./views');
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(middleware.MoltinAuth);

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

app.listen(8000, function(){
    console.log('Ecommerce moltin app');
    // console.log(config.ClientID);
    // console.log(config.ClientSecret);
});
