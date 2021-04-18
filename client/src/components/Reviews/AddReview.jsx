import React from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Modal,
  Col,
  Row,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Stars from "react-stars";
import { addReview } from "../../actions/reviewsActions";
import { connect } from "react-redux";
import swal from "sweetalert";

function AddReview({
  addReview,
  user,
  product,
  productId,
  idUser,
  reviewQualification,
  productName,
  onRenderRequest
}) {
  const [show, setShow] = useState(false);
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [Err, setErr] = useState({
    starsErr: "",
    descriptionNullErr: "",
    descriptionShortErr: "",
  });

  function validateForm() {
    setErr({ starsErr: "", descriptionErr: "" });
    let starsErr = "";
    let descriptionNullErr = "";
    let descriptionShortErr = "";

    if (stars == 0) {
      starsErr = " Forgot to push on the stars?";
    }
    if (description.length == "") {
      descriptionNullErr = " Description can not be empty";
    }
    if (description.length < 20) {
      descriptionShortErr = (
        <p>
          {" "}
          Please be more verbose ;)
          <br /> At least 20 characters
        </p>
      );
    }
    if (starsErr || descriptionShortErr || descriptionNullErr) {
      setErr({ starsErr, descriptionShortErr, descriptionNullErr });
      return false;
    } else return true;
  }
  let userid = idUser;
  let review = {
    description: description,
    qualification: stars,
    userId: userid,
  };
  const handleOnSubmit = (e, productId) => {
    e.preventDefault();
    const valid = validateForm();
    if (valid) {
      addReview(productId, review);
      swal("Review added successfully!", {
        icon: "success",
      });
      setShow(false);
    }
    setTimeout(() => {
      onRenderRequest()
    }, 100);
  };

  const handleOnclick = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleOnChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };
  const star = {
    count: 5,
    onChange: (stars) => setStars(stars),
    size: 74,
    color2: "#8a2be2",
    half: false,
  };
  let qualification = reviewQualification && reviewQualification;
  const productNames = productName && productName;

  return (
    <React.Fragment>
      {qualification ? (
        <Button
          onClick={(e) => handleOnclick(e)}
          style={{
            backgroundColor: "#8a2be2",
            border: "#8a2be2",
            marginTop: "-20px",
            height: "40px",
          }}
          className="m-1"
          disabled={true}
        >
          Add review
        </Button>
      ) : (
        <Button
          onClick={(e) => handleOnclick(e)}
          style={{
            backgroundColor: "#8a2be2",
            border: "#8a2be2",
            marginTop: "-20px",
            height: "40px",
          }}
          className="m-1"
          disabled={false}
        >
          <b>Add review</b>
        </Button>
      )}
      &nbsp; &nbsp;
      <Modal
        show={show}
        onHide={() => setShow(false)}
        keyboard={true}
        animation={true}
        centered={true}
      >
        <Modal.Header
          style={{ backgroundColor: "#8a2be2", color: "white" }}
          closeButton={true}
          closeLabel={"Close"}
        >
          <Modal.Title>Add a review to <br/>{productNames}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <h4>Rate your product.</h4>
          <Form>
            <Stars {...star} />
            {Err.starsErr && (
              <p
                className="mt-2"
                style={{ color: "red", fontSize: 14, textAlign: "left" }}
              >
                {Err.starsErr}
              </p>
            )}
            <hr />
            <h4>Give us a product review.</h4>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Don't be shy</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="textarea"
                aria-label="Description"
                placeholder="Your review"
                onChange={(e) => handleOnChange(e)}
              ></FormControl>
              <hr />
            </InputGroup>
            {Err.descriptionNullErr && (
              <p
                className="mt-2"
                style={{ color: "red", fontSize: 14, textAlign: "left" }}
              >
                {Err.descriptionNullErr}
              </p>
            )}
            {Err.descriptionShortErr && (
              <div
                className="mt-2"
                style={{ color: "red", fontSize: 14, textAlign: "left" }}
              >
                {Err.descriptionShortErr}
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row lg="5">
              <Col lg="2">
                <Button
                  onClick={() => setShow(false)}
                  className="button-register mt-1"
                >
                  Close
                </Button>
              </Col>
              <Col lg="7"></Col>
              <Col lg="3">
                <Button
                  className="button-register mt-1"
                  onClick={(e) => handleOnSubmit(e, productId)}
                >
                  Send
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    product: state.productReducer.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (user, review) => dispatch(addReview(user, review)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
