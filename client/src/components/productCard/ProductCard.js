import React, { useState } from 'react';
import {
    Card,
    CardImg,
    CardBody,
    Button,
    Col,
    Collapse
} from 'reactstrap';
import styles from './productCard.module.scss';

let ProductCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <Col md="6" lg="4" className="my-5" >
            <Card className={styles.card} onClick={toggle}>
                <CardImg className={styles.cardImg} top src={props.imgSrc} alt={props.imgAlt} />
                <Collapse isOpen={isOpen}>
                    <CardBody>
                        <h3 className="text-center">${props.price}</h3>
                        <p>{props.description}</p>
                        <Button onClick={() => props.addCartItem(props.id)}>Add to Cart</Button>
                    </CardBody>
                </Collapse>
            </Card>
        </Col>
    );
};

export default ProductCard;