const url = require('url');

const products = function(req, res, next){
    let { Moltin } = req;
    Moltin.Products.All()
    .then(prods => {
        res.send(prods);
    });
};

const cartItems = function(req, res, next){
    let { Moltin } = req;
    Moltin.Cart().Items().then((data) => {
        res.send(data);
    });
};

const addToCart = function(req, res, next){
    let { Moltin } = req;
    if (!req.body.product_id || ! req.body.quantity){
        res.status(400).send("Invalid product_id or quantity");
        return
    }
    Moltin.Cart().AddProduct(req.body.product_id, req.body.quantity).then((data) => {
        res.send(data);
    }, function(reason){
        console.log(reason);
    });
}

const removeItemFromCart = function(req, res, next){
    let { Moltin } = req;
    if (!req.body.item_id) {
        res.status(400).send("Please provide ItemID");
        return
    }
    console.log(req.body);
    console.log(req.body.item_id);
    if(!req.body.item_id){
        res.status(400).send("Plese provide item_id")
    }
    if (!req.body.quantity){
        req.body.quantity = 0
    }
    // RemoveItem not working
    Moltin.Cart().UpdateItemQuantity(req.body.item_id, req.body.quantity).then((data) => {
        res.send(data);
    }, function(reason){
        console.log(reason);
    })
}

const checkout = function(req, res, next){
    let { Moltin } = req;
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query);
    if (parseInt(query.address_id)==0){
        const billing_address = {
          first_name: 'John',
          last_name: 'Doe',
          line_1: '123 Sunny Street',
          line_2: 'Sunnycreek',
          county: 'California',
          postcode: 'CA94040',
          country: 'US'
        };

        const shipping_address = {
          first_name: 'John',
          last_name: 'Doe',
          line_1: '123 Sunny Street',
          line_2: 'Sunnycreek',
          county: 'California',
          postcode: 'CA94040',
          country: 'US'
        };

        const customer = {
          id: "97781eb1-ad0b-4dcc-b36b-3f22bf93bb37"
        };

        const body = {
            'customer': customer,
            'billing_address': billing_address,
            'shipping_address': shipping_address
        }
        Moltin.Cart().Checkout(customer, billing_address, shipping_address).then((data) => {
            res.send(data);
        }, function(reason){
            console.log(reason);
        });
    } else {
        res.send("Please send address_id");
    }
}

const payment = function(req, res, next){
    let { Moltin } = req;
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    Moltin.Orders.Payment(query.order_id, {
      gateway: 'stripe',
      method: 'purchase',
      first_name: 'John',
      last_name: 'Doe',
      number: '4242424242424242',
      month: '02',
      year: '2020',
      verification_value: '123'
    }).then((data) => {
        res.send("Payment Successfull");
    }, function(reason){
        res.send("Payment Successfull");
    });
    Moltin.Cart().Delete();
}

module.exports = {
    'getProducts': products,
    'getCartItems': cartItems,
    'addToCart': addToCart,
    'checkout': checkout,
    'removeItemFromCart': removeItemFromCart,
    'payment': payment
}
