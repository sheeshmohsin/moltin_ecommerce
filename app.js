const app = require('express')();
const config = require('./config');

app.listen(8000, function(){
    console.log('Ecommerce moltin app');
    console.log(config.ClientID);
    console.log(config.ClientSecret);
});
