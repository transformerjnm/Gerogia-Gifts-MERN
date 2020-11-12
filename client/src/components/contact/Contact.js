import React from 'react';
import ContactForm from '../form/ContactForm';

const Contact = props => {
    return(
        <ContactForm authenticated={props.authenticated} authUsername={props.authUsername}/>
    );
};

export default Contact;