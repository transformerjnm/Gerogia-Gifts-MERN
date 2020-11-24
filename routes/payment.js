const express = require('express');
const PaymentRouter = express.Router();
const stripe = require("stripe")('sk_test_51HqS6pFKwuTnRfKPLEfWZMezNe9Ft3IOyb7Ul1uH9XWKkKZpFBDmJfBt2mAQS8SJMkx0vWbAS4xVrVTGCGCTXxjq00Ll6d2DIC');

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