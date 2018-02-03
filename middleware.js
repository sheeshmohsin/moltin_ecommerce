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

module.exports = {
    'MoltinAuth': MoltinAuth
}
