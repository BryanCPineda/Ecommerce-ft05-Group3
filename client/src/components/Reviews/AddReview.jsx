import React,  {useEffect} from 'react';
import { useState } from 'react';
import { Button, Container, Modal, Col, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
import ReactStars from 'react-stars';
import {addReview} from '../../actions/reviewsActions';
import {connect} from 'react-redux';

function AddReview(addReview, id) {
  const[show, setShow] = useState(false);
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState('');

  const handleOnclick = (e) => {
    setShow(true);
  }
  console.log('ID', id)
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const review = {
      qualification: stars,
      description: description
    };
    addReview(id, review);
    setShow(false);
  }
  
  return (
    <React.Fragment>
      <Button 
        onClick={(e)=>handleOnclick(e)}
        className=""
      >
        Add review
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
          <Modal.Title>Product review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Rate your product.</h4>
          <Form>
            <ReactStars
              count={5}
              onChange={stars=>setStars(stars)}
              size={44}
              color2={'#8a2be2'} 
            />
            <hr/>
            <h4>Give us a product review.</h4>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Don't be shy</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                as="textarea"  
                aria-label="Description" 
                placeholder="Your review"
                onChange={e=>setDescription(e.target.value)}
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
    review: state.reviewsReducer.review
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addReview: (id, review) => dispatch(addReview(id, review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview)
