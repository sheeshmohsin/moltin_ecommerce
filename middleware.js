const moltin = require('@moltin/sdk');
const config = require('./config');

const MoltinAuth = function(req, res, next) {
    let Moltin = moltin.gateway({
        client_id: config.ClientID,
        client_secret: config.ClientSecret
    });
    Moltin.Authenticate()
        .then(response => {
            req.Moltin = Moltin;
            next();
        });

};

const crossOrigin = function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
}

module.exports = {
    'MoltinAuth': MoltinAuth,
    'crossOrigin': crossOrigin
}
