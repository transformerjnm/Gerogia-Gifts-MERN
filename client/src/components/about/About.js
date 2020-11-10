import React from 'react';
import { Row, Col, Container } from 'reactstrap';

const About = () => {
 return(
    <main className="pb-5">
        <Container>
            <section>
                <Row>
                    <Col sm="3">
                        <img className="my-5 py-5 img-fluid" src={ process.env.PUBLIC_URL + "/assets/images/house.png"} alt=" Original location of Georgia Gifts." />
                    </Col>
                    <Col sm="9">
                        <h2 className="my-5 py-5" >What is Lorem Ipsum?</h2>
                        <p>
                            lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic
                        </p>
                    </Col>
                </Row>
                <Row>               
                    <p className="my-5 py-5">
                        lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus et voluptatibus, animi atque voluptatem temporibus ipsum aliquid pariatur porro quaerat tempora neque cumque veniam labore mollitia in sit molestiae magnam!
                    </p>
                </Row>
            </section>
        </Container>
    </main>
 );
};

export default About;