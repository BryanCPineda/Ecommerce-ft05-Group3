import React from 'react';
import { useState } from 'react';
import { Button, Container, Modal, Col, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
import ReactStars from 'react-stars';
import {editReview} from '../../actions/reviewsActions';
import {connect} from 'react-redux';
import swal from 'sweetalert';

function EditReview({editReview, user, product, reviewid, reviewDescription }, ) {
  const[show, setShow] = useState(false);
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState('');

  const handleOnclick = (e) => {
    e.preventDefault();
    setShow(true);
  }
  const handleOnChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value)
    console.log(e.target.value)
  }
  const id = reviewid;
  console.log('reviewid', id)

  const handleOnSubmit = (e) => {
    const review = {
      description: description,
      qualification: Math.round(stars),
    };
    editReview(id, review);
    swal('Review edited successfully!',{
      icon: 'success'
    })
    setShow(false);
  }

  const star = {
    count:5,
    onChange: stars=>setStars(stars),
    size: 74,
    color2: '#8a2be2',
    half: false,
  }
  return (
    <React.Fragment>
      <Button 
        onClick={(e)=>handleOnclick(e)}
        className="m-1"
        style={{backgroundColor: '#8a2be2', border: '#8a2be2', marginTop: '-20px', height: '40px'}}
      >Edit
      </Button>
      &nbsp;
      &nbsp;
      <Modal 
        show={show} 
        onHide={()=>setShow(false)}
        keyboard={true}
        animation={true}
        centered={true}
      >
        <Modal.Header 
          style={{ backgroundColor: "#8a2be2", color: "white" }}
          closeButton={true} 
          closeLabel={'Close'}
        >
          <Modal.Title>Change your review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Current Review</h4>
          <p>
            {reviewDescription ? reviewDescription : 'Ups! something went wrong'}
          </p>
          <h4>Rate the product.</h4>
          <Form>
            <ReactStars {...star}/>
            <hr/>
            <h4>Type a new product review</h4>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Your review</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                as="textarea"  
                aria-label="Description" 
                placeholder="We hope it's for better!"
                onChange={e=>handleOnChange(e)}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row lg='5'>
              <Col lg='2'>
                <Button
                  onClick={()=>setShow(false)}
                  className="button-register mt-1"
                >Close
                </Button>
              </Col>
              <Col lg='7'></Col>
              <Col lg='3'>
                <Button
                  className="button-register mt-1"
                  onClick={handleOnSubmit}
                >Send
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    // review: state.reviewsReducer.review,
    user: state.userReducer.user,
    product: state.productReducer.product
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editReview: (productId, review) => dispatch(editReview(productId, review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);