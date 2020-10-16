import React, { useEffect, useState } from "react"
import {Container, Row, Col, Modal, Button, Card, InputGroup, Form} from 'react-bootstrap'
import NumberFormat from "react-number-format"
import { FiTrash2 } from 'react-icons/fi'

//-------------- Redux ------------------------
import { connect } from 'react-redux'
import { getProduct } from "../../actions/product"

function OrderUse({orderline, product}) {

    console.log('orderline',orderline)
    console.log(product)
    const [prod, setProd] = useState([])

    useEffect(() => {
        console.log(product.name)
    }, [])
    
    return (
        <Col className="mb-3">
        <Card className="border-0">
          <Card.Body className="bg-light text-center">
            <Row>
              <Col xs={3} md={2}>
                <img alt={'Imagen del producto: '+product.name} className="w-75" src={product.image && product.image[0]} /> 
              </Col>
              <Col>
                <Row>
                  <Col xs={6} md={4} className="mb-3 text-left">
                      <h4>{product.name}</h4>
                  </Col>
                  <Col xs={6} md={3} className="mb-3 text-center">
                    <InputGroup size="sm">
                      <InputGroup.Prepend>
                        <Button
                        //   onClick={() => restar()}
                          variant="dark"
                          className="px-2"
                        >
                          -
                        </Button>
                      </InputGroup.Prepend>
                      <Form.Control
                        className="border-dark"
                        type="number"
                        disabled
                        value={orderline.quantity}
                      />
                      <InputGroup.Append>
                        <Button
                        //   onClick={() => sumar()}
                          variant="dark"
                          className="px-2"
                        >
                          +
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                  <Col className="text-left">
                    <span className="h6">
                      <NumberFormat
                        prefix="$"
                        value={product.price}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType={"text"}
                      />
                    </span>
                  </Col>
                  <Col className="text-left">
                    <Button
                      size="sm"
                    //   onClick={() => onDelete(productId)}
                      variant="danger"
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    )
}

function mapStateToProps(state) {
    return {
            product: state.productReducer.product,
    }
}


function mapDispatchToProps(dispatch) {
    return {
            // getProduct: (id) => dispatch(getProduct(id)),
            // createProduct: (prod) => dispatch(createProduct(prod)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderUse);
