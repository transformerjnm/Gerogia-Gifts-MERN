import React, { useState, Fragment } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from './nav.module.scss';

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const [errors, setErrors] = useState({username: '', password: ''});
	const [ formValues, setFormValues] = useState({username: '', password: ''});
	const [ authenticated,  setAuth ] = useState(false);
	const [ authUsername, setAuthName ] = useState('');

	const toggleNav = () => setIsOpen(!isOpen);
	const toggleModal = () => setModal(!modal);

	const validateInput = target => {
		if (target.required) {
			if (target.value === null || target.value === "") {
				setErrors( { ...errors, ...{ [target.name]: "This field is required and must not be Blank."} } );
				return false;
			}
			if (target.value.length < 4 ) {
				setErrors( { ...errors, ...{ [target.name]: "This field must be at least 4 characters long."} } );
				return false;
			}
		}
		setErrors({...errors, ...{ [target.name]: null} } );
		return true;
	};

	const onBlur = event => {
		let target = event.target;
		if (validateInput(target)) {
			setFormValues( { ...formValues, ...{ [target.name]: target.value } } );
		}
	};

	const onSubmit = event => { event.preventDefault(); }

	const register = () => {
		fetch('/register', 
		{
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: formValues.username,
				password: formValues.password
			})
		})	
		.then( async (res) => {
			let body = await res.json();
			if(body.body == "User Created") {
				alert('Your account has been created!');
				setAuth(true);
				setAuthName(formValues.username);
			} else if (body.body == "User already exist") {
				alert('User already exist');
			} else {
				alert('Failure to signup. Please try again');
			}
		}).catch( err => console.log("register Failed", err));
	}

	const login = () => {
		toggleModal();
		fetch('/login', 
		{
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: formValues.username,
				password: formValues.password
			})
			
		})
		.then( async (res) => {
			let body = await res.json();
			if(body.body != "No User Exists") {
				alert('You have logged in!');
				setAuth(true);
				setAuthName(formValues.username);
			} else {
				alert('incorrect username or password.');
			}
		}).catch( err => console.log('Login failed', err));
	}

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
			setAuth(false);
			setAuthName('');
			alert('You have logged out!');
		}).catch( err => console.log("logout Failed", err));
	}

	let authenticationButton;
	if (authenticated) {
		authenticationButton = <a className={styles.navLink} style={{fontSize: "1rem", display: "block"}} onClick={logout}>Logout</a>;
	} else {
		authenticationButton = <a className={styles.navLink} style={{fontSize: "1rem", display: "block"}} onClick={toggleModal}>Login</a>;
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
			 <Modal isOpen={modal} toggle={toggleModal} >
				<ModalHeader className="my-1" toggle={toggleModal}>
					<h4>Welcome!</h4>
					<span>login or signup to get exclusive offers.</span>
				</ModalHeader>
				<ModalBody>
					<Form className="p-5 my-1 mx-auto" onSubmit={onSubmit}>
						<FormGroup className="mb-5">
							<h4>Who are you?</h4>
							<Label className="mt-4"  for="username" > Your User Name *</Label>
							<Input className="form-control mb-4" type="text" name="username" id="username" maxLength="60" required invalid={errors.username} onBlur={onBlur}/>
							<FormFeedback className={styles.feedback}>{errors.username}</FormFeedback>

							<Label className="mt-4" for="password">Your Password *</Label>
							<Input className="form-control mb-4" type="password" name="password" id="password" required invalid={errors.password} onBlur={onBlur}/>
							<FormFeedback className={styles.feedback}>{errors.password}</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Button type="submit" onClick={login}>Login</Button>
							<Button type="submit" onClick={register}>Signup</Button>
						</FormGroup>
					</Form>
				</ModalBody>			
			</Modal>
		</Fragment>
	);
};

export default Navigation;