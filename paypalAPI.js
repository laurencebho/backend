const paypal = require('paypal-rest-sdk');
paypal.configure(require('./keys/paypal.json'));


function create_payment(name, price, callback) {
    if (typeof price !== "string") {
        // VERY important that price is a string, otherwise we may
        // have rounding issues
        throw new Error("price needs to be a string!");
    }
    return paypal.payment.create({
        intent: 'sale',
        payer: {payment_method: 'paypal'},
        redirect_urls: {
            return_url: 'http://localhost:8080/paypal/ok',
            cancel_url: 'http://localhost:8080/paypal/cancel',
        },
        transactions: [{
            description: `PVCC: ${name}`,
            item_list: {
                items: [{
                    name: name,
                    sku:  name,
                    price: price,
                    currency: "GBP",
                    quantity: 1,
                }]
            },
            amount: {
                currency: "GBP",
                total: price,
            },
        }]
    }, callback);
}


function execute_payment(paymentId, payerId, callback) {
    return paypal.payment.execute(paymentId, {payer_id: payerId}, callback);
}


module.exports = {
    create_payment,
    execute_payment,
};
