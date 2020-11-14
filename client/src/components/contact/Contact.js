import React from 'react';
import ContactForm from '../form/ContactForm';
import Fade from 'react-reveal/Fade';

const Contact = props => {
    return(
        <Fade left>
            <ContactForm authenticated={props.authenticated} authUsername={props.authUsername}/>
        </Fade>
    );
};

export default Contact;