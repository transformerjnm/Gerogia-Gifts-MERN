import React from 'react';
import { Jumbotron, Row, Col } from 'reactstrap';
import styles from './heroContent.module.scss';
import Jump from 'react-reveal/Jump';

const HeroContent = (props) => {
    return (
        <Jumbotron className={styles.jumbotron}>
            <Row className="align-items-center justify-content-center">
                <Col sm="12" md="5" className="text-center">
                    <Jump>
                        <h1>Create Happiness<br></br>
                        For your loved ones.</h1>
                    </Jump>
                </Col>
                <Col sm="12" md="7">
                    <img className={styles.giftGivingSvg} src={process.env.PUBLIC_URL + '/assets/images/giftgiving.svg'} alt="Orange Peach logo for Georgia Gifts" />
                </Col>
            </Row>
            <Row>
                <Col sm="4" className="text-center mt-1">
                    <i> <address>17 Peachy Ave, Atlanta GA 30589</address> </i>
                </Col>
                <Col sm="4" className="text-center mt-1">
                    <i> <span>770-777-7777</span> </i>
                </Col>
                <Col sm="4" className="text-center mt-1">
                    <i> <span>GAGifts@gmail.com</span> </i>
                </Col>
            </Row>
        </Jumbotron>
    );
};

export default HeroContent;