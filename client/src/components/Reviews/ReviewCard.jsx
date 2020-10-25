import React from 'react'
import { Col, Modal, Row, Table } from 'react-bootstrap'
import store from '../../store'
import AddReview from './AddReview';
import EditReview from './AddReview';
import DeleteReview from './AddReview';

function ReviewCard() {
  const[show, setShow] = useState(false);

  // const handleOnclick = (e) => {
  //   e.preventDefault();
  //   setShow(true);
  // }
  const state = store.getState();
  const orders = state.ordersReducer.orders;
  const reviews = state.reviewsReducer.reviews;
  const products = state.productsReducer.reviews;
  console.log('ORDERS', orders);
  console.log('REVIEWS', reviews);
  console.log('PRODUCTS', products);

  const array = [];
  const p = products.map(product=>{
    array.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qualification: qualification = ()=>{reviews.find(review.productId === product.id)}
    })
  })
  let createMyCustomArray = () => {
    for (let i = 0; i < array.length; i++) {
      
    }
    return
  }

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
        <Table striped bordered hover className="table table-ligth table-sm table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>Price</th>
                  <th>Product</th>
                  <th>Stars</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.map((order, index) => {
                    return (
                      <tr key={index} className="text-center">
                        <td>{order.product[0] && order.product[0]}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{<EditReview/>}{<DeleteReview/>}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </Table>
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
              <AddReview/>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

export default ReviewCard
