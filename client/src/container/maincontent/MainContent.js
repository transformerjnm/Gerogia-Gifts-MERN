import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../header/Header';
import Home from '../../components/home/Home';
import About from '../../components/about/About';
import Contact from '../../components/contact/Contact';
import Cart from '../../components/cart/Cart';
import Footer from '../../components/footer/Footer';

const MainContent = props => {
    const [cartItemsIds, setCartItems] = useState([]);
    const [ authenticated,  setAuth ] = useState(false);
    const [ authUsername, setAuthName ] = useState('');
    
    let getCartItemsId = () => cartItemsIds;

    let addCartItem = ( newItemId) =>{
        let newCart = [...cartItemsIds];
        newCart.push(newItemId);
        setCartItems(newCart);
    };

    let clearCart = () => setCartItems([]);

    let removeCartItem = (cartItemId) => {
        if(cartItemsIds.length === 1){
            clearCart();
        } else {                
            let index = cartItemsIds.indexOf(cartItemId);
            let newCart = [...cartItemsIds];
            newCart.splice(index, 1);
            setCartItems(newCart);
        }
    };
    
    return(
        <Switch>
            <Route exact path='/' >
                <Header setAuthName={setAuthName} setAuth={setAuth} authenticated={authenticated} authUsername={authUsername} /> 
                <Home addCartItem={addCartItem} authenticated={authenticated} authUsername={authUsername}/>
                <Footer />
            </Route>
            <Route path='/about' >
                <Header setAuthName={setAuthName} setAuth={setAuth} authenticated={authenticated} authUsername={authUsername} /> 
                <About />
                <Footer />
            </Route>      
            <Route path='/contact' >
                <Header setAuthName={setAuthName} setAuth={setAuth} authenticated={authenticated} authUsername={authUsername} /> 
                <Contact authenticated={authenticated} authUsername={authUsername} />
                <Footer />
            </Route>
            <Route path='/cart' >
                <Header setAuthName={setAuthName} setAuth={setAuth} authenticated={authenticated} authUsername={authUsername} /> 
                <Cart getCartItemsId={getCartItemsId} removeCartItem={removeCartItem} clearCart={clearCart} authenticated={authenticated} authUsername={authUsername}/>
                <Footer />
            </Route>                     
            <Redirect to='/' />
        </Switch>              
    );
};

export default MainContent;