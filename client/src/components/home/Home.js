import React, {Fragment, useEffect, useState} from 'react';
import { Row, Container, Spinner } from 'reactstrap';
import ProductCard from '../productCard/ProductCard';
import ContactForm from '../form/ContactForm';

const Home = (props) => {
    let [products, setProducts] = useState([]);
    
    useEffect(() => {
        getData().then(res => setProducts(res));
    }, []);

    let getData = async () => {
        const response = await fetch('/getProduct');
        const body = await response.json();
        return body;
    }

    let getFeaturedProducts = () => {
        let bestSellersCards = null;
        if(products[0]){      
            bestSellersCards = Object.values(products[0]).map( product => {
                if(product.bestSeller) {
                    return(
                        <ProductCard addCartItem={props.addCartItem} key={product.id} id={product.id} price={parseFloat(product.price.$numberDecimal).toFixed(2)} description={product.description} title={product.title} imgSrc={process.env.PUBLIC_URL + product.imgSrc} imgAlt={product.imgAlt}/>
                    );
                }
            });
        } else {
            return(<Spinner color="secondary" style={{width: 30,height: 30, margin: 'auto'}}/>)
        }
        return bestSellersCards;
    };

    return(
        <Fragment>
            <Container>
                <h2 className="text-center my-5 py-5">Best Sellers</h2>
                <Row>                 
                    { getFeaturedProducts() }                  
                </Row>
            </Container>
            <Container>
                <ContactForm />
            </Container>
        </Fragment>
    );
};

export default Home;