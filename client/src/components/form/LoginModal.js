import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const LoginModal = props => {
	const [errors, setErrors] = useState({ username: '', password: '' });
	const [formValues, setFormValues] = useState({ username: '', password: '' });

	const onSubmit = event => { event.preventDefault(); }

	/*
		Logout function is in the header due to the logout button being in the nav.
		Modal and toggle modal are also in the nav
	*/

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
			.then(async (res) => {
				let body = await res.json();
				if (body.body == "User Created") {
					alert('Your account has been created!');
					props.setAuth(true);
					props.setAuthName(formValues.username);
				} else if (body.body == "User already exist") {
					alert('User already exist');
				} else {
					alert('Failure to signup. Please try again');
				}
			}).catch(err => console.log("register Failed", err));
	}

	const login = () => {
		props.toggleModal();
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
			.then(async (res) => {
				let body = await res.json();
				if (body.body != "No User Exists") {
					alert('You have logged in!');
					props.setAuth(true);
					props.setAuthName(formValues.username);
				} else {
					alert('incorrect username or password.');
				}
			}).catch(err => console.log('Login failed', err));
	}

	const validateInput = target => {
		if (target.required) {
			if (target.value === null || target.value === "") {
				setErrors({ ...errors, ...{ [target.name]: "This field is required and must not be Blank." } });
				return false;
			}
			if (target.value.length < 4) {
				setErrors({ ...errors, ...{ [target.name]: "This field must be at least 4 characters long." } });
				return false;
			}
		}
		setErrors({ ...errors, ...{ [target.name]: null } });
		return true;
	};

	const onBlur = event => {
		let target = event.target;
		if (validateInput(target)) {
			setFormValues({ ...formValues, ...{ [target.name]: target.value } });
		}
	};

	return (
		<Modal isOpen={props.modal} toggle={props.toggleModal} >
			<ModalHeader className="my-1" toggle={props.toggleModal}>
				<h4>Welcome to the family!</h4>
			</ModalHeader>
			<ModalBody>
				<Form className="p-5 my-1 mx-auto" onSubmit={onSubmit}>
					<FormGroup className="mb-5">
						<h4>Who are you?</h4>
						<Label className="mt-4" for="username" > Your User Name *</Label>
						<Input className="form-control mb-4" type="text" name="username" id="username" maxLength="60" required invalid={errors.username} onBlur={onBlur} />
						<FormFeedback style={{ fontSize: '1rem' }}>{errors.username}</FormFeedback>
						<Label className="mt-4" for="password">Your Password *</Label>
						<Input className="form-control mb-4" type="password" name="password" id="password" required invalid={errors.password} onBlur={onBlur} />
						<FormFeedback style={{ fontSize: '1rem' }}>{errors.password}</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Button type="submit" onClick={login}>Login</Button>
						<Button className="mt-4" type="submit" onClick={register}>Signup</Button>
					</FormGroup>
				</Form>
			</ModalBody>
		</Modal>
	);
}

export default LoginModal;