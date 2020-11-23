const express = require('express');
const PaymentRouter = express.Router();
const stripe = require("stripe")('sk_test_51HqS6pFKwuTnRfKPh8BTsJwQfPJAsAPA60YN2tbvOrziUMO2RwUsrTcgET1G58B1vUoIszQqFyHGz25Nsne09fXw00BWtyFD9Y');

const calculateOrderAmount = items => {
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	return 1400;
};

PaymentRouter.route('/')
.post( async (req, res) => {
	const { items } = req.body;
	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
	  amount: calculateOrderAmount(items),
	  currency: "usd"
	});
	res.send({
	  clientSecret: paymentIntent.client_secret
	});
});

module.exports = PaymentRouter;