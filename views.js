const products = function(req, res, next){
    let { Moltin } = req;
    Moltin.Products.All()
    .then(prods => {
        res.send(prods);
    });
};

module.exports = {
    'getProducts': products
}
