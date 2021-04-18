import React from 'react';
import { useState } from 'react';
import { Button, Container, Modal, Col, Row, Form, InputGroup, FormControl } from 'react-bootstrap';
import ReactStars from 'react-stars';
import {editReview} from '../../actions/reviewsActions';
import {connect} from 'react-redux';
import swal from 'sweetalert';

function EditReview({editReview, onRenderRequest, productName, reviewid, reviewDescription }, ) {
  const[show, setShow] = useState(false);
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState('');
  const [Err, setErr] = useState({
    starsErr: "", 
    descriptionNullErr: "",
    descriptionShortErr: ""
  })

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
    const valid = validateForm();
    if(valid){
      editReview(id, review);
      swal("Review edited successfully!", {
        icon: "success",
      })
      setShow(false);
    }
    setTimeout(() => {
      onRenderRequest()
    }, 100);
  }
  function validateForm(){
    setErr({starsErr:"",  descriptionErr:""});
    let starsErr = "";
    let descriptionNullErr = "";
    let descriptionShortErr = "";
    
    if(stars == 0){
      starsErr= " Forgot to push on the stars?";
    }
    if(description.length == ""){
      descriptionNullErr = " Description can not be empty";
    }
    if(description.length < 20){
      descriptionShortErr = (<p> Please be more verbose ;)<br/> At least 20 characters</p>);
    }
    if(starsErr || descriptionShortErr || descriptionNullErr) {
      setErr({ starsErr, descriptionShortErr, descriptionNullErr });
      return false;
    }
    else return true;
  }
  const star = {
    count:5,
    onChange: stars=>setStars(stars),
    size: 74,
    color2: '#8a2be2',
    half: false,
  }
  const productNames = productName && productName;

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
          <Modal.Title>Change the review of <br/>{productNames}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Current Review</h4>
          <p>
            {reviewDescription ? reviewDescription : 'Ups! something went wrong'}
          </p>
          <h4>Rate the product.</h4>
          <Form>
            <ReactStars {...star}/>
            {Err.starsErr && <p className="mt-2" style={{color: 'red', fontSize: 14, textAlign: 'left'}}>{Err.starsErr}</p>}
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
            {Err.descriptionNullErr && <p className="mt-2" style={{color: 'red', fontSize: 14, textAlign: 'left'}}>{Err.descriptionNullErr}</p>}
            {Err.descriptionShortErr && <div className="mt-2" style={{color: 'red', fontSize: 14, textAlign: 'left'}}>{Err.descriptionShortErr}</div>}
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