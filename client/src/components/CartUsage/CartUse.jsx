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
  updateProductToCart,
  cambioEstadoCarrito,
  vaciarCarrito,
  quitarItemCarrito,
  getProductsFromCart,
  reloadCart
} from "../../actions/order";
import { getProducts, updateProduct } from "../../actions/product";


const Cart = ({order, 
  getOrder, 
  products, 
  getProducts, 
  updateProduct, 
  updateProductToCart,
  cambioEstadoCarrito, 
  vaciarCarrito, 
  quitarItemCarrito, 
  user, 
  totalReducer, 
  cartProducts,
  getProductsFromCart,
  cart,
  reload,
  reloadCart,
  isAuthenticated
}) => {
    

  const [state, setState] = useState({ 
    products: order.product,
    bandera: true,
    total: ''
    })

const [total, setTotal] = useState();

console.log("ahora el total es", total);

// manejo de carrito de guest------------
const logueado = isAuthenticated
const [cantidad, setCantidad] = useState(0)
let inicioCart = JSON.parse(localStorage.getItem('carrito'))
console.log('inicio',inicioCart)
let itemsCart = []
inicioCart && inicioCart.map(item =>{
        let product = {
          id: item.id,
          name: item.name,
          price: item.price,
          stock: item.stock,
          images: item.images,
          orderline: {
            quantity: item.quantity,
            id: item.id
          }
        }
        itemsCart.push(product)
})

const quitarItemGuest = (id) => {
    let items = []
    let quitar = itemsCart.findIndex(e => e.id === id)
    itemsCart.splice(quitar,1)
    console.log('quitar', quitar)
  
    quitar = itemsCart ? itemsCart.forEach(e =>{
      let item = {
      id: e.id,
      name: e.name,
      price: e.price,
      quantity: e.orderline.quantity,
      stock: e.stock,
      images: e.images,
      }
      items.push(item)

    }) : ''
    
    localStorage.setItem("carrito", JSON.stringify(items))
}


// ------------------redireccionar --------------
const [stateRedirect, setRedirect] = useState({ redirect: null })
// ------------------redireccionar --------------
let prod = []
let totalCost = 0;

/***********************CALCULO DEL PRECIO POR MEDIO DE LAS ORDER LINE******************************** */
const token = localStorage.getItem("token")
 
useEffect(()=>{ 
  if(user){
  getProductsFromCart(user.id).then( ()=>{
    let totalCost2 = 0;
      cartProducts.orderlines && cartProducts.orderlines.map(e => {
          totalCost2 = totalCost2 +  (e.price * e.quantity) 
      })
      setState({
        ...state,
        total: totalCost2})
      })
  }
},[reload]) 

/***********************CALCULO DEL PRECIO POR MEDIO DE LAS ORDER LINE******************************** */

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
  let itemsChange=[]
  totalCost = 0;
  if (!logueado) {
    let item = itemsCart ? itemsCart.forEach( e =>{
      if(e.id === id){
        if(cantCambiada === e.orderline.quantity) return;
        e.stock = e.stock + e.orderline.quantity - cantCambiada
        e.orderline.quantity = cantCambiada
      }
    }) : ""
    item = itemsCart ? itemsCart.forEach( e =>{
      let item = {
        id: e.id,
        name: e.name,
        price: e.price,
        quantity: e.orderline.quantity,
        stock: e.stock,
        images: e.images,
        }
        itemsChange.push(item)
    }) : ''
    console.log('items cambiados', itemsChange)
    localStorage.setItem("carrito", JSON.stringify(itemsChange))
    item = itemsCart ? itemsCart.forEach( e=>{
        totalCost += e.price * e.orderline.quantity
    }) : ""
    setState({
      ...state,
      total: totalCost
    })

    return
  }
  let updateProd = {}
  let diferencia = 0
  prod = order.product
  console.log('productooooo', order.product)
  prod ? prod.forEach( e => {
    if (e.orderline.id === id){
       if(cantCambiada === e.orderline.quantity) return;
      e.stock = e.stock + e.orderline.quantity - cantCambiada
      e.orderline.quantity = cantCambiada
      let body = {
        orderlineQuantity: e.orderline.quantity,
        orderlineId:e.orderline.id
      }
      updateProd = body
    }}
  ) : console.log('')
  console.log(updateProd)
  //hago update del carrito y update del stock------------------------
    updateProductToCart(user.id, updateProd)

  prod && prod.forEach( e =>{
    totalCost += e.price * e.orderline.quantity
    
    })
   
  setState({
    ...state,
    products: prod,
    total: totalCost
  })

}


const handleDelete = (id) =>{
  swal({
    title: "Are you sure?",
    text: "You will delete this item from your cart!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      if (!logueado){
        quitarItemGuest(id) 
        setState({
          bandera: !state.bandera
        })
      } else {
              quitarItemCarrito(user.id, id).then(()=>{
              getProductsFromCart(user.id).then(()=>{
                reloadCart();
                
              })
          
        })
      }
      setState({
        bandera: false
      })
      
      swal("Your Item Has Been Deleted!", {
        icon: "success",
      })
  } } )
}

const handleFinCompra =() =>{


  // let prodEnviar = []
  //   products.map (e => {
  //     prodEnviar = {
  //       name: e.name,
  //       description: e.description,
  //       price: e.price,
  //       stock: e.stock,
  //       categories:'',
  //       images: ''
  //     }
  //     updateProduct(e.id, prodEnviar)}
  //   ) 
  if (!logueado){
    swal("Order Created!", {
      icon: "success",
    }).then(() => {
        localStorage.clear()
        setRedirect({ redirect: "/user/checkout" });
      }
    )
    return
  } 
  cambioEstadoCarrito(order.orderId, 'Created', state.total)
  swal("Order Created!", {
    icon: "success",
  }).then(() => {
      setRedirect({ redirect: "/user/checkout" });
    }
  )
    
  }

const handleVaciarCarrito = () =>{
  swal({
    title: "Are you sure?",
    text: "You will empty your cart!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      if (!logueado){
        itemsCart =[]
        localStorage.clear()
        setRedirect({ redirect: "/user/catalogo" });
      } else {
        vaciarCarrito(user.id)
        setState({
          ...state,
            total: 0
      })
      swal("Your cart is Empty!", {
        icon: "success",
      }).then(() => {
        
      setRedirect({ redirect: "/user/catalogo" });
        })
    } } 
  })
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
              </Col>
              {/* ------------------ */}
              <Col>
                <Row>
                  <Col xs={6} md={4} className="text-center number" style={{color: 'white'}}>
                    <span className="h6">Products</span>
                  </Col>
                  <Col xs={6} md={3} className="text-left ml-2 number" style={{color: 'white'}}>
                    <span className="h6">Quantity</span>
                  </Col>
                  <Col className="text-center number" style={{color: 'white'}}>
                    <span className="h6">Price</span>
                  </Col>
                  <Col className="text-left ml-4 number" style={{color: 'white'}}> 
                    <span className="h3">
                      <IoMdTrash />
                    </span>
                  </Col>
                </Row>

              </Col> 

              {/* </Row> */}
            </Col>
          </Row>
          <Row className="m-3 d-none d-md-block">
            <Col>
              <Row className="bg-light text-center py-2  ">
                <Col className="mx-3">
                  {/* {console.log("productos-----", products)}
                  {console.log("guestproducts---", itemsCart)} */}
                  {(!logueado)? (itemsCart ? (
                    itemsCart.map((e) => (
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
                  )): ""}
                  {logueado? (products ? (
                    products.map((e) => (
                      <OrderUse
                        logueado={logueado}
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
                  )):""}
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
                  value={state.total}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  displayType={"text"}
                />
              </h4>
              <Button
                className="btn btn-dark boton"
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
    totalReducer: state.orderReducer.total,
    cartProducts: state.orderReducer.cartProducts,
    cart: state.orderReducer.cart,
    reload: state.orderReducer.reloadCart,
    isAuthenticated: state.userReducer.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrder: (idUser) => dispatch(getOrder(idUser)),
    getProducts: () => dispatch(getProducts()),
    cambioEstadoCarrito: (id, status, totalPrice) =>
    dispatch(cambioEstadoCarrito(id, status, totalPrice)),
    updateProductToCart: (idUser, body) => dispatch(updateProductToCart(idUser, body)),
    // updateProduct: (id, prod) => dispatch(updateProduct(id, prod)),
    vaciarCarrito: (idUser) => dispatch(vaciarCarrito(idUser)),
    quitarItemCarrito: (idUser, id) => dispatch(quitarItemCarrito(idUser, id)),
    getProductsFromCart: (idUser) => dispatch(getProductsFromCart(idUser)),
    reloadCart: ()  =>  dispatch (reloadCart () ),
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);