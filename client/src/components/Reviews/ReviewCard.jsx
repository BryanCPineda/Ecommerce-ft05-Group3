import React from 'react'
import { Col, Modal, Row, Table } from 'react-bootstrap'
import store from '../../store'
import AddReview from './AddReview';
import EditReview from './AddReview';
import DeleteReview from './AddReview';

function ReviewCard() {
  const[show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Modal size='xl'>
        <Modal.Header
          style={{ backgroundColor: "#8a2be2", color: "white" }}
          closeButton={true} 
          closeLabel={'Close'}
        >
          Your products reviews
        </Modal.Header>
        <Modal.Body>
        
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col lg='5'>
              <Button
                  onClick={()=>setShow(false)}
                  className="button-register mt-1"
              >Close
              </Button>
            </Col>
            <Col lg='7'></Col>
            <Col lg='3'>
              <EditReview/>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

export default ReviewCard
