import React from "react";
import "./About.css";

// reactstrap components
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container className="container-about-use">
      <div id="about">
        <Container>
          <div className="title">
            <h2 className="title-1">About us</h2>
            <h4 className="title-1">
              A brief introduction to Henry's ecommerce group 3 members.
            </h4>
          </div>
          <Row> 
            <Col className="mr-auto" md="2" sm="3">
              <h4 className="title-1">Cinthia Pardos</h4>
              <img
                alt="..."
                className="img-circle img-responsive"
                src={"/images/about/cin.jpg"}
              />
              <p className="title-1">dffsfsdf</p>
            </Col>
            <Col className="mr-auto" md="2" sm="3">
              <h4 className="title-1">Santiago Barrios</h4>
              <img
                alt="..."
                className="img-circle img-responsive"
                src={"/images/about/santi.jpeg"}
              />
              <p className="title-1">
                critico del arte especializado en el periodo renacentista
              </p>
            </Col>
            <Col className="mr-auto" md="2" sm="3">
              <h4 className="title-1">Matias Funes</h4>
              <img
                alt="..."
                className="img-circle img-responsive"
                src={"/images/about/mati.jpeg"}
              />
              <p className="title-1">console.log("acaaaaa", res.data)<br></br>console.log("soy el bodyyyyy", req.body)</p>
            </Col>
          </Row>
          <Row>
            <Col className="mr-auto" md="2" sm="3">
              <h4 className="title-1">Bryan Pineda</h4>
              <img
                alt="..."
                className="img-circle img-responsive"
                src={"/images/about/bryan.jpeg"}
              />
              <p className="title-1">John Keynes</p>
            </Col>
            <Col className="mr-auto" md="2" sm="3">
              <h4 className="images-title">Thumbnail</h4>
              <img alt="..." className="img-thumbnail img-responsive" />
              <p className="text-center">John Keynes</p>
            </Col>
            <Col className="mr-auto" md="2" sm="3">
              <h4 className="images-title">Thumbnail</h4>
              <img alt="..." className="img-thumbnail img-responsive" />
              <p className="text-center">John Keynes</p>
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
};
export default About;
