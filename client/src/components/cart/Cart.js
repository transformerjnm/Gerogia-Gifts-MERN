import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Container, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './cart.module.scss';
import StripeCart from '../form/StripeCart';
import Fade from 'react-reveal/Fade';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
const promise = loadStripe('pk_test_51HqS6pFKwuTnRfKPpld5DydVwJjDRH6UPLJt7ckvZLLg3ojOr7SVZtMs2Q6XbrSPnAvq2r0dothg19TfPRnLqD9H00UbMPSlJZ');
const Cart = (props) => {
    let [products, setProducts] = useState([]);
    let [confirmOrder, setConfirmOrder] = useState(false);

    useEffect(() => {
        getData().then(res => setProducts(res));
    }, []);

    let getData = async () => {
        const response = await fetch('/getProduct');
        const body = await response.json();
        return body;
    }
    /*
        array returned by props.getCartItemsID is all the id of the products that the user has added to cart.
        This function gets and returns the product data for all the item ids as an array of objects.
    */
    let getProductsInfoById = () => {
        let cartItemsId = props.getCartItemsId();
        if (products.length > 0) {
            let customerProductsInfo = cartItemsId.map((singleId) => {
                let item = Object.values(products[0]).filter(product => product.id === singleId)
                return item[0];
            });
            return customerProductsInfo;
        }
    };

    //creates and returns JSX that shows all the items in the cart
    let total = 0.00;
    let showCartProducts = () => {
        let cartProducts = getProductsInfoById();

        if (cartProducts) {
            let key = 1;
            //calculate total and make each product jsx display
            let cartProductsDisplay = cartProducts.map(product => {
                total += parseFloat(product.price.$numberDecimal);
                key++;
                return (
                    <Row className={styles.cartItemContainer + " align-items-center my-3 mx-1"} key={key}>
                        <Col xs="4" md="2">
                            <img className={styles.imageStyle + " rounded  img-fluid"} src={process.env.PUBLIC_URL + product.imgSrc} alt={product.imgAlt} />
                        </Col>
                        <Col xs="8" md="6">
                            <p>
                                {/* React docs way for inline rendering. if confirmOrder === false render else do nothing */}
                                {confirmOrder === false &&
                                    <FontAwesomeIcon icon={faTimes} className={styles.removeCartItem + " mr-3"} aria-hidden="true" onClick={() => props.removeCartItem(product.id)} />
                                }
                                {product.name}
                            </p>
                        </Col>
                        <Col xs="12" md="4" className="text-right"><p> Price: ${product.price.$numberDecimal}</p></Col>
                    </Row>
                );
            });
            //defaults if cart is empty
            let cartDisplay = <Row className="mt-5"><p>Looks like your cart is empty. Please add some awesome stuff to the cart to proceed. </p></Row>;
            if (props.authenticated) {
                cartDisplay = <Row className="mt-5"><p>{`${props.authUsername}, Your cart is empty! Please add some awesome stuff to the cart to proceed.`}</p></Row>;
            }
            let stripePaymentForm = null;
            //if customer order is confirmed then show the stripe cart form for payment
            if (confirmOrder) {
                stripePaymentForm = (
                    <Elements stripe={promise} >
                        <StripeCart getCartItemsId={props.getCartItemsId} authenticated={props.authenticated} authUsername={props.authUsername} />
                    </Elements>
                );
            }
            //set cart to products if customer has products in their cart
            if (cartProductsDisplay.length) {
                cartDisplay = (
                    <Fragment>
                        {/* React docs way for inline rendering. if confirmOrder === false render else do nothing */}
                        { confirmOrder === false &&
                            <Row><Col xs="12" md="4" lg="3"><Button className="btn mb-5" onClick={() => props.clearCart()}>Clear Cart</Button></Col></Row>
                        }
                        {cartProductsDisplay}
                        <Row className="mt-5" ><Col className="text-right"><p> Total: ${total.toFixed(2)} </p></Col></Row>
                        <Row className="mt-5" ><Col className="text-right"><p> Total After Tax(7%): ${(total * 1.07).toFixed(2)}</p></Col></Row>
                        { confirmOrder === false &&
                            <Row><Col xs="12" md="4" lg="3"><Button className="btn mb-5" onClick={() => setConfirmOrder(true)}>Proceed to Checkout</Button></Col></Row>
                        }
                        {stripePaymentForm}
                    </Fragment>
                );
            }
            //use default if empty cart products display
            if (cartDisplay) {
                return (
                    <Fragment>
                        {cartDisplay}
                    </Fragment>
                );
            } else {
                return <Spinner color="secondary" />;
            }
        }
    };
    return (
        <Fade left>
            <Container>
                {showCartProducts()}
            </Container>
        </Fade>
    );
};

export default Cart;