const express = require('express');
const PaymentRouter = express.Router();
require('dotenv/config');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/product');

let getProductsInfoById = async (products, cartItemsId ) => {  
	try {
		//console.log("Products", products);
		//console.log("Cart ITems ID:", cartItemsId);	
		/*let customerProductsInfo = cartItemsId.map( (singleId) => {
			let item = Object.values(products[0]).filter( product => product.id === singleId)
			return item[0];
		});*/
		//console.log(products[0]);
		//Object.values(products[0]).forEach((product) => {console.log(product)});
		return 1400;
	} catch(err) { console.log(err) }
};

const calculateOrderAmount = async itemsID => {
	try {
		let cartProducts = [];
		const allProducts = await Product.find();
		console.log(allProducts);
		if(allProducts.length > 0) { 
			cartProducts = await getProductsInfoById(allProducts, itemsID);
		}
		return 1400;
    } catch(err){
        console.log(err);
    }
	// Replace this constant with a calculation of the order's amount
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
};

PaymentRouter.route('/')
.post( async (req, res) => {
	try {
		const { items } = req.body;
	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
	  amount: await calculateOrderAmount(items),
	  currency: "usd"
	});
	res.send({
	  clientSecret: paymentIntent.client_secret
	});
	} catch(err) { res.json(err) }
});

module.exports = PaymentRouter;``