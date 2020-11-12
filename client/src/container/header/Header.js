import React, { Fragment } from 'react';
import Nav from '../../components/nav/Navigation';
import HeroContent from '../../components/herocontent/HeroContent';

const Header = (props) => {
    return(
        <Fragment>
            <Nav setAuthName={props.setAuthName} setAuth={props.setAuth} authenticated={props.authenticated} authUsername={props.authUsername} />
            <HeroContent />
        </Fragment>    
    );
};

export default Header;