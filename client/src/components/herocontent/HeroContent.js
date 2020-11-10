import React from 'react';
import { Jumbotron, Row, Col } from 'reactstrap';
import styles from './heroContent.module.scss';

const HeroContent = (props) => {
    return (
        <Jumbotron className={styles.jumbotron}>
            <Row>
                <Col sm="4" className="text-center">
                    <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'}  className={styles.logo + " img-fluid"} alt="Orange Peach logo for Georgia Gifts" />
                </Col>
                <Col sm="8" className="align-self-center mt-5 text-center text-md-left">
                    <h1>Custom southern Gifts</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="4" className="text-center mt-5">
                    <i> <address>17 Peachy Ave, Atlanta GA 30589</address> </i>
                </Col>
                <Col sm="4" className="text-center mt-5">
                    <i> <span>770-777-7777</span> </i>                   
                </Col>
                <Col sm="4" className="text-center mt-5">
                    <i> <span>GAGifts@gmail.com</span> </i>
                </Col>
            </Row>
        </Jumbotron>
    );
};

export default HeroContent;