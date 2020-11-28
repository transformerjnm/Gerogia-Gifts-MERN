const express = require('express');
const PaymentRouter = express.Router();
require('dotenv/config');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/product');

let getProductsInfoById = async (products, cartItemsId ) => {  
	try {	
		let customerProductsInfo = cartItemsId.map( (singleId) => {
			let item = Object.values(products[0]).filter( product => product.id === singleId)
			return item[0];
		});
		return customerProductsInfo;
	} catch(err) { console.log(err) }
};

const calculateOrderAmount = async itemsID => {
	let total = 0.00;
	try {
		let cartProducts = [];
		const allProducts = await Product.find().lean();
		
		if(allProducts.length > 0) { 
			cartProducts = await getProductsInfoById(allProducts, itemsID);
			//calc total
			if(cartProducts) {
				cartProducts.forEach(product => {
					total += parseFloat(product.price);
				});
				//convert to stripe form. in pennies. plus tax example $14.55 would be 1455 for stripe
				total = parseInt((total * 1.07) * 100);
			}
		}
		return total;
    } catch(err){
        console.log(err);
    }
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