import React, { useState, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from './nav.module.scss';
import LoginModal from '../form/LoginModal';

const Navigation = props => {
	//state for authenticated and authUsername are stored in mainContent
	const [isOpen, setIsOpen] = useState(false);
	const [modal, setModal] = useState(false);

	const toggleNav = () => setIsOpen(!isOpen);
	const toggleModal = () => setModal(!modal);

	const logout = () => {
		fetch('/logout', 
		{
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then( res => {
			props.setAuth(false);
			props.setAuthName('');
			alert('You have logged out!');
		}).catch( err => console.log("logout Failed", err));
	}

	let authenticationButton;
	if (props.authenticated) {
		authenticationButton = <a className={styles.navLink} style={{fontSize: "1rem", display: "block"}} onClick={ logout }>Logout</a>;
	} else {
		authenticationButton = <a className={styles.navLink} style={{fontSize: "1rem", display: "block"}} onClick={ toggleModal }>Login</a>;
	}

	return(  
		<Fragment>
			<Navbar color="light" light expand="md">
			<NavbarToggler onClick={toggleNav} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="mr-auto" navbar>
					<NavItem>
						<NavLink exact activeClassName={styles.active} className={styles.navLink + " nav-link"} to="/">Home</NavLink>
					</NavItem>
					<NavItem>
						<NavLink activeClassName={styles.active} className={styles.navLink + " nav-link"} to="/about">About</NavLink>
					</NavItem>
					<NavItem>
						<NavLink activeClassName={styles.active} className={styles.navLink + " nav-link"} to="/contact">Contact</NavLink>
					</NavItem>
					<NavItem>
						{authenticationButton}
					</NavItem>			
				</Nav>        
				<Link to="/cart"><FontAwesomeIcon icon={faShoppingCart} className={styles.cart}/></Link>
			</Collapse>
			</Navbar> 
			<LoginModal modal={modal} toggleModal={toggleModal} setAuth={props.setAuth} setAuthName={props.setAuthName}/>
		</Fragment>
	);
};

export default Navigation;