const app = require('express')();
const moltin = require('moltin');
const config = require('./config');
const middleware = require('./middleware');
const views = require('./views');

app.use(middleware.MoltinAuth);

app.get('/products', (req, res) => {
    views.getProducts(req, res);
});

app.listen(8000, function(){
    console.log('Ecommerce moltin app');
    console.log(config.ClientID);
    console.log(config.ClientSecret);
});
