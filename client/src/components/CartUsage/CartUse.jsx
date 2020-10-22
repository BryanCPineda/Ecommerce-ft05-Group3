import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { IoMdTrash, IoMdPhotos, IoIosCart } from "react-icons/io";
import NumberFormat from "react-number-format";
import OrderUse from "./OrderUse";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import "./CartUse.css";

//-------------- Redux ------------------------
import { connect } from "react-redux";
import {
  getOrder,
  cambioEstadoCarrito,
  vaciarCarrito,
  quitarItemCarrito,
  handleTotalReducer
} from "../../actions/order";
import { getProducts, updateProduct } from "../../actions/product";

const Cart = ({order, getOrder, products, getProducts, updateProduct, cambioEstadoCarrito, vaciarCarrito, quitarItemCarrito, user, totalReducer, handleTotalReducer }) => {
    
  // useEffect(() => {
  //   if(totalReducer) {
  //     setTotal(totalReducer)
  //   }
  // }, [])
    
  const [state, setState] = useState({
    products: order.product,
    bandera: true
    })


const [total, setTotal] = useState();

console.log("ahora el total es", total);

 //  console.log("estado local", total)
// ------------------redireccionar --------------
const [stateRedirect, setRedirect] = useState({ redirect: null })
// ------------------redireccionar --------------
let prod = []
let totalCost = 0;

useEffect(() => {
  if(user) {
    console.log("idddddddd", user.id)
    getOrder(user.id)
  setState({
    products: order.product
    })
      
    console.log("escuche que quitaste un item del carrito")
  }
  
}, [state.bandera, total])
    
useEffect(() => {
  if(user) {
    getOrder(user.id)
  setState({
    products: order.product
    })
  }
}, [])
  

const quantityChange = (e, id) =>{
  let cantCambiada = e
  totalCost = 0;
  prod = order.product

  prod ? prod.forEach( e => {
    if (e.orderline.id === id){
      e.stock = e.stock + e.orderline.quantity - cantCambiada
      e.orderline.quantity = cantCambiada
    }}
  ) : console.log('nada')

  prod && prod.forEach( e =>{
    totalCost += e.price * e.orderline.quantity
    
    })
 
  
  //setTotal((state) =>{
  //  return {totalCost: }
  //})
  

  // setTotal(totalReducer) 
 setTotal(totalCost) 
   
  setState({
    ...state,
    products: prod})

  // handleTotalReducer(totalReducer);

}


const handleDelete = (id) => {
  if(user) {
    swal({
      title: "Are you sure?",
      text: "You will delete this item from your cart!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        quantityChange(0,id)
        quitarItemCarrito(user.id, id);
        setState({
          bandera: !state.bandera
        })
        
        swal("Your Item Has Been Deleted!", {
          icon: "success",
        })
    } } )
  }
}

const handleFinCompra =() =>{

  let prodEnviar = []
    products.map (e => {
      prodEnviar = {
        name: e.name,
        description: e.description,
        price: e.price,
        stock: e.stock,
        categories:'',
        images: ''
      }
      updateProduct(e.id, prodEnviar)}
    ) 
  cambioEstadoCarrito(order.orderId, 'Created')
  swal("Order Created!", {
    icon: "success",
  }).then(() => {
      setRedirect({ redirect: "/user/catalogo" });
    }
  )
    
  }

const handleVaciarCarrito = () =>{
  if(user) {
    swal({
      title: "Are you sure?",
      text: "You will empty your cart!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        vaciarCarrito(user.id)
        setTotal(()=>{
              return setTotal(0); 
        })
        swal("Your cart is Empty!", {
          icon: "success",
        }).then(() => {
          
        setRedirect({ redirect: "/user/catalogo" });
          })
    } } )
  }
  
}
if (stateRedirect.redirect) {
        return <Redirect to={stateRedirect.redirect} />
      }
  return (
    <Row>
      <Col xs={2}></Col>
      <Col>
        <Container className="container-cart-use">
          <Row className="m-3 d-none d-md-block cart-text ">
            <Col className=" text-center py-2" style={{ color: "white" }}>
              My Cart <IoIosCart />
            </Col>
          </Row>
          <Row className="m-3 d-none d-md-block">
            <Col>
              {/* <Row className="bg-light text-center py-2"> */}
              {/* <Col xs={3} md={2}>
                <span className="h3">
                  <IoMdPhotos />
                </span>
              </Col> */}
              {/* ------------------ */}
              {/* <Col>
                <Row>
                  <Col xs={6} md={4} className="text-center number" >
                    <span className="h6">Products</span>
                  </Col>
                  <Col xs={6} md={3} className="text-left ml-2 number">
                    <span className="h6">Quantity</span>
                  </Col>
                  <Col className="text-center number">
                    <span className="h6">Price</span>
                  </Col>
                  <Col className="text-left ml-4 number">
                    <span className="h3">
                      <IoMdTrash />
                    </span>
                  </Col>
                </Row>
              </Col> */}
              {/* </Row> */}
            </Col>
          </Row>
          <Row className="m-3 d-none d-md-block">
            <Col>
              <Row className="bg-light text-center py-2  ">
                <Col className="mx-3">
                  {products ? (
                    products.map((e) => (
                      <OrderUse
                        orderline={e}
                        quantityChange={quantityChange}
                        handleDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <div>
                      <p>
                        <img
                          src="../images/shopping_Sad-512.png"
                          alt="sad cart"
                        ></img>
                        <h3> Your cart is empty!</h3> <br></br> Add something to
                        make me happy :)
                      </p>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="mx-3 text-center">
            <Col xs={6} className="text-center bg-light p-3 ml-auto">
              <h4 className="mb-4 ">
                Total:
                <NumberFormat
                  prefix=" $"
                  value={total}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  displayType={"text"}
                />
              </h4>
              <Button
                className="btn  boton"
                onClick={handleFinCompra}
                style={{
                  backgroundColor: "#8a2be2",
                  color: "white",
                  border: "none",
                }}
              >
                Finalize Purchase
              </Button>
              <button
                className="btn  boton"
                style={{ backgroundColor: "#8a2be2", color: "white" }}
                onClick={handleVaciarCarrito}
              >
                Empty Cart
              </button>
            </Col>
          </Row>
          {/* )} */}
        </Container>
      </Col>
      <Col xs={2}></Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    order: state.orderReducer.order,
    products: state.orderReducer.products,
    user: state.userReducer.user,
    totalReducer: state.orderReducer.total
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrder: (idUser) => dispatch(getOrder(idUser)),
    getProducts: () => dispatch(getProducts()),
    cambioEstadoCarrito: (id, status) =>
      dispatch(cambioEstadoCarrito(id, status)),
    updateProduct: (id, prod) => dispatch(updateProduct(id, prod)),
    vaciarCarrito: (idUser) => dispatch(vaciarCarrito(idUser)),
    quitarItemCarrito: (idUser, id) => dispatch(quitarItemCarrito(idUser, id)),
    handleTotalReducer: (totalReducer) => dispatch(handleTotalReducer(totalReducer))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
