import React, { useEffect, useState } from "react"
import { FiPlus } from "react-icons/fi";
import {Container, Row, Col, Modal, Button} from 'react-bootstrap'
import {MdCameraAlt, MdDelete} from 'react-icons/md'
import NumberFormat from "react-number-format"
import OrderUse from './OrderUse'

//-------------- Redux ------------------------
import { connect } from 'react-redux'
import { getOrder  } from '../../actions/order'
import { getProducts } from "../../actions/product"



const Cart = ({order, getOrder, products, getProducts}) => {
    
    const [state, setState] = useState([])
    useEffect(() => {
        getOrder()
        getProducts()
      }, [])

      useEffect(() => {
    //     if(!products) return;
    //    let productos = []
    //   let total = 0;
    //   products && products.forEach(item => {
    //     let productos = {
    //       id: item.id,
    //       name: item.name,
    //       price: item.orderline.price,
    //       quantity: item.orderline.quantity,
    //       stock: item.stock,
    //       subtotal: 0
    //     }
    //     productos.push(productos);
    //     total += productos.subtotal;
    //   });
    //     const orden = order.length > 0 ? order.map(e => e) : 'not'
        console.log('orden',order)
        console.log('products',products)
      }, [order, products])
      
  return ( 
    <Container>
        <Row className="m-3 d-none d-md-block">
          <Col>
            <Row className="bg-light text-center py-2">
              <Col xs={3} md={2}>
                <span className="h3">
                  <MdCameraAlt />
                </span>
              </Col>
              {/* ------------------ */}
              <Col>
                <Row>
                  <Col xs={6} md={4} className="text-left">
                    <span className="h6">Producto</span>
                  </Col>
                  <Col xs={6} md={3} className="text-left ml-2">
                    <span className="h6">Cantidad</span>
                  </Col>
                  <Col className="text-left">
                    <span className="h6">Precio</span>
                  </Col>
                  <Col className="text-left ml-4">
                    <span className="h3">
                      <MdDelete />
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="m-3 d-none d-md-block">
          <Col>
            <Row className="bg-light text-center py-2">
            <Col className="mx-3">
                {order.length > 0 ? order.map (e => 
                <OrderUse orderline={e} />):'no prod'}
                </Col>
            </Row>
            </Col>
        </Row>
        
{/* 
            {order.length > 0 ? order.map(e => 
                <Row>
                    <Col className="mx-3">
                   
                        <tr>
                            <td>-</td>
                            <td>-</td> 
                            <td>{e.quantity}</td> 
                            <td>{e.price}</td>  
                        </tr>
                    </Col>
                </Row>) : 'no prod'} */}
              
               
        {/* {state.products.length < 1 && (
          <Row>
            <Col className="mx-3">
              <Alert variant="info">
                {" "}
                Lo sentimos, no tienes productos agregados al carrito.{" "}
              </Alert>
            </Col>
          </Row>
        )} */}
        
        {/* {state.products.map(item => (
           <Order
              key={item.id}
              productId={item.id}
              image={item.image}
              title={item.name}
              quantity={item.quantity}
              price={item.price}
              stock={item.stock}
              onDelete={handleDelete(item.id)}
              quantityChange={handleChangeQuantity()}
              token={token}
            />
        ))} */}

        {/* {state.products.length > 0 && ( */}
          <Row className="mx-3 text-center">
            <Col xs={4} className="text-center bg-light p-3 ml-auto">
              <h4 className="mb-4 ">
                Precio total:
                <NumberFormat
                  prefix=" $"
                  value={99}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  displayType={"text"}
                />
              </h4>
              <Button
                className="btn btn-danger"
               
              >
                Finalizar Compra
                </Button>
              <Button
                className="btn btn-danger"
               
              >
                Vaciar Carrito
              </Button>
            </Col>
          </Row>
        {/* )} */}
      </Container>
    );
}

function mapStateToProps(state) {
    return {
            order: state.orderReducer.order,
            products: state.productReducer.products,
    }
}


function mapDispatchToProps(dispatch) {
    return {
            getOrder: () => dispatch(getOrder()),
            getProducts: () => dispatch(getProducts()),
            // createProduct: (prod) => dispatch(createProduct(prod)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);