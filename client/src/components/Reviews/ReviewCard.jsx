import React, {useState} from 'react';
import {connect} from 'react-redux'
import { Col, Modal, Row, Table, Button, Container } from 'react-bootstrap';
import EditReview from './EditReview';
import {deleteReview} from '../../actions/reviewsActions';
import {oneStar, towStars, threeStars, fourStars, fiveStars} from './stars';
import swal from 'sweetalert';


function ReviewCard({reviewDescription, reviewid, reviewQualification, deleteReview}) {
  const[show, setShow] = useState(false);
  const id = reviewid;
  console.log('reviewid', id)
  
  const handleOnDelete = (e) => {
    swal({
      title: "Are you sure?",
      text: "You are about to delete this Review\nThere's no going back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(accepted=>{
      if(accepted){
        deleteReview(id);
        swal("Review deleted successfully!", {
          icon: "success",
        })
        setShow(false);
      } 
    })
  }
  const handleOnclick = (e) => {
    e.preventDefault();
    setShow(true);
  }
  var qualification = reviewQualification;
  var stars;
  let errMsg = 'Ups! something went wrong :(';

  function myStars(qualification) {
    if (qualification == 1) { return stars = oneStar}
    if (qualification == 2) { return stars = towStars}
    if (qualification == 3) { return stars = threeStars}
    if (qualification == 4) { return stars = fourStars}
    if (qualification == 5) { return stars = fiveStars}
    else { stars = errMsg }
  }
  myStars(qualification)

  return (
    <React.Fragment>
      {!qualification ?
        (<Button 
          onClick={(e)=>handleOnclick(e)}
          style={{backgroundColor: '#8a2be2', border: '#8a2be2', marginTop: '-20px', height: '40px'}}
          className="m-1"
          disabled={true}
        >Show Review</Button>) :
          (<Button 
            onClick={(e)=>handleOnclick(e)}
            style={{backgroundColor: '#8a2be2', border: '#8a2be2', marginTop: '-20px', height: '40px'}}
            className="m-1"
            disabled={false}
          ><b>Show Review</b>
          </Button>)
      }
      <Modal 
        size='md' 
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
          <Modal.Title>Your products review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Qualification</h5>
        <div className='bigStars'>
          {stars}
        </div>
        <hr/>
        <h5>Description</h5>
          <p>
            {reviewDescription ? reviewDescription : 'Ups! something went wrong'}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col lg='6'>
                <Button
                    onClick={()=>setShow(false)}
                    className="button-register mt-1"
                >Close
                </Button>
              </Col>
              <Col lg='3'>
                <EditReview
                  reviewDescription={reviewDescription}
                  reviewQualification={reviewQualification}
                  reviewid={id}
                />
              </Col>
              <Col lg='3'>
                <Button 
                  onClick={(e)=>handleOnDelete(e)}
                  style={{backgroundColor: '#8a2be2', border: '#8a2be2', marginTop: '-20px', height: '40px'}}
                  className="m-1"
                >Delete
                </Button>
                {/* <DeleteReview/> */}
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

const matchDispatchToProps = (dispatch) => {
  return {
    deleteReview: (id) => dispatch(deleteReview(id))
  }
}

export default connect(null, matchDispatchToProps)(ReviewCard);