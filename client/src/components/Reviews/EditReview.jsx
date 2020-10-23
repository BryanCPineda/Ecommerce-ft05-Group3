import React,  {useEffect} from 'react';
import { useState } from 'react';
import { Button, Container, Modal, Col, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
import ReactStars from 'react-stars';
import {editReview} from '../../actions/reviewsActions';
import {connect} from 'react-redux';

function EditReview({editReview, user, product}) {
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
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const review = {
      description: description,
      qualification: Math.round(stars),
      userdId: user.id
    };
    const id = product.id
    editReview(id, review);
    setShow(false);
  }
  
  return (
    <React.Fragment>
      <Button 
        onClick={(e)=>handleOnclick(e)}
        className=""
      >Edit review
      </Button>
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
          <h4>Rate the product.</h4>
          <Form>
            <ReactStars
              count={5}
              onChange={stars=>setStars(stars)}
              size={54}
              color2={'#8a2be2'} 
            />
            <hr/>
            <h4>The new product review?</h4>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Your review</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                as="textarea"  
                aria-label="Description" 
                placeholder="I hope it's for better"
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
    editReview: (user, review) => dispatch(editReview(user, review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReview);