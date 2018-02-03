const app = require('express')();
const moltin = require('moltin');
const config = require('./config');
const middleware = require('./middleware');

app.use(middleware.MoltinAuth);

app.listen(8000, function(){
    console.log('Ecommerce moltin app');
    console.log(config.ClientID);
    console.log(config.ClientSecret);
});
