import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../components/home/Home';
import About from '../../components/about/About';
import Contact from '../../components/contact/Contact';
import Cart from '../../components/cart/Cart';

class MainContent extends Component {
    state = {
        cartItemsIds: [],
    };

    render() {
        let getCartItemsId = () => this.state.cartItemsIds;

        let addCartItem = ( newItemId) =>{
            let newCart = [...this.state.cartItemsIds];
            newCart.push(newItemId);
            this.setState( {cartItemsIds: newCart } ) ;     
        };

        let clearCart = () => this.setState({ cartItemsIds: []});

        let removeCartItem = (cartItemId) => {
            if(this.state.cartItemsIds.length === 1){
                clearCart();
            } else {                
                let index = this.state.cartItemsIds.indexOf(cartItemId);
                let newCart = [...this.state.cartItemsIds];
                newCart.splice(index, 1);
                this.setState({ cartItemsIds: newCart });
            }
        };
       
        return(
            <Switch>
                <Route exact path='/' >
                    <Home addCartItem={addCartItem}/>
                </Route>
                <Route exact path='/georgia-gifts-react' >
                    <Home addCartItem={addCartItem}/>
                </Route>
                <Route path='/about' >
                    <About />
                </Route>      
                <Route path='/contact' >
                    <Contact />
                </Route>
                <Route path='/cart' >
                    <Cart getCartItemsId={getCartItemsId} removeCartItem={removeCartItem} clearCart={clearCart}/>
                </Route>                     
                <Redirect to='/' />
            </Switch>              
        );
    };
};

export default MainContent;