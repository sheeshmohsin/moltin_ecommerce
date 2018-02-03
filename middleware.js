const moltin = require('moltin');
const config = require('./config');

const MoltinAuth = function(req, res, next) {
    let Moltin = moltin.gateway({
        client_id: config.ClientID,
        client_secret: config.ClientSecret
    });
    Moltin.Authenticate()
        .then(response => {
            req.Moltin = Moltin;
            console.log("authenticated", response);
            next();
        });

};

module.exports = {
    'MoltinAuth': MoltinAuth
}
