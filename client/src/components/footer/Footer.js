import React from 'react';
import styles from './footer.module.scss';
import { Row, Col } from 'reactstrap';
import {
    Nav,
    NavItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return(
        <footer className="container-fluid ">
            <Row>
                <Col sm="4" className=" align-self-center my-3 text-center">
                    <i><span>GAGifts@gmail.com</span></i>
                    <br></br><br></br>
                    <i><span>770-777-7777</span></i>
                    <br></br><br></br>
                    <i><address>17 Peachy ave, Atlanta GA 30589</address></i>
                    <br></br><br></br>
                </Col>
                <Col sm="4" className="align-self-center my-3 text-center ">
                    <FontAwesomeIcon icon={faFacebook} className={styles.social + " text-primary" } />
                    <br></br><br></br>
                    <FontAwesomeIcon icon={faInstagram} className={styles.social + " text-primary" } />
                    <br></br><br></br>
                    <FontAwesomeIcon icon={faTwitter} className={styles.social + " text-primary" } />
                    <br></br><br></br>                 
                </Col>
                <Col sm="4" className="align-self-center my-3">
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
                    </Nav>         
                </Col>               
            </Row>
            <div className="text-center mt-3">
                <span>&copy; Copyright 2020 Georgia Gifts</span>
            </div>
        </footer>
    );
};

export default Footer;