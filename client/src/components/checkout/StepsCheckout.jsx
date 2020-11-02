import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddAddress from "./AddAdress";
import Payment from "./Payment";
import Review from "./Review";
import swal from 'sweetalert'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {sendPurchase} from './../../actions/sendEmail';
import { updateOrder } from '../../actions/orders';
import {cambioEstadoCarrito,getProductsForCheckout} from "../../actions/order";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    background: "#8a2be2",
  },
}));



const steps = ["Shipping address", "Payment details", "Review your order"];



function getStepContent(step, handleBan) {


  switch (step) {
    case 0:
      return <AddAddress handleBan={handleBan} />;
    case 1:
      return <Payment  handleBan={handleBan}/>;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

function Checkout({ sendPurchase, user, getProductsForCheckout, cambioEstadoCarrito, cart, updateOrder, orderId }) {

  const [bandera, setBandera] = useState(true)

const handleBan = (ban) => {
  setBandera(ban)
}

// ------------------redireccionar --------------
const [stateRedirect, setRedirect] = useState({ redirect: null })
// ------------------redireccionar --------------
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);


  useEffect(()=>{ 
    if(user){
        getProductsForCheckout(user.id)
    }
  },[user]) 

  useEffect(()=>{ 
     
  },[getProductsForCheckout]) 

  useEffect(()=>{ 
    console.log('steps', activeStep)
    if (activeStep === 2) { 
      setBandera(false) 
      return
    }
    setBandera(true)
  },[activeStep]) 

  const handleNext = () => {
    setActiveStep(activeStep + 1)
    const address = JSON.parse(localStorage.getItem('adress'))
    if (activeStep === steps.length - 1)
    { 
      const userSend = {
        name: address.name,
        lastname: address.lastname,
        email: user.email,
        address: address.address1,
        city: address.city,
        zip: address.zip,
        countre: address.country                         
      }
      const productos = cart && cart.product.map(e => {
        let product = {
          id: e.id,
          name: e.name,
          price: e.price,
          quantity: e.orderline.quantity
        }
        return product
      })
      const info = {
        orderId: cart.orderId,
        products: productos,
        totalPrice: cart.totalPrice
      }
      cambioEstadoCarrito(cart.orderId, 'Complete', cart.totalPrice)
      swal("Order Completed! Thank you for your purchase", {
        icon: "success",
      }).then(() => {
      sendPurchase(userSend, info)
        localStorage.removeItem('adress')

    }
      ) 
  }
  };

  const handleCancelOrder = () => {
    let state = {
      status: 'Canceled',
      orderId: orderId
    }
    updateOrder(state)
    setRedirect({ redirect: "/user/catalogo" })
  }

  const handleClick = () => {
    setRedirect({ redirect: "/user/catalogo" });
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (stateRedirect.redirect) {
    return <Redirect to={stateRedirect.redirect} />
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Paper className={classes.paper}>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{cart.orderId}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Button className='boton' style={{backgroundColor: '#8a2be2', color: 'white' }} onClick={handleClick}>
                  Thank you, go back to home!
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>

                {getStepContent(activeStep, handleBan)}
                <div className={classes.buttons}>
                <Button onClick={handleCancelOrder} className={classes.button}
                 style={{marginRight: '460px', backgroundColor: '#8a2be2', color: 'white', width: '80px', height: '50px'}}>Cancel Order</Button>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} style={{color: 'white'}} className={classes.button}>
                      Back
                    </Button>
                  )}
                  
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={bandera ? "disabled" : ""}
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}


function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    cart: state.orderReducer.cartProducts,
    orderId: state.orderReducer.cartProducts.orderId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendPurchase: (user, info) => dispatch(sendPurchase(user, info)),
    getProductsForCheckout: (idUser) => dispatch(getProductsForCheckout(idUser)),
    cambioEstadoCarrito: (id, status, totalPrice) => dispatch(cambioEstadoCarrito(id, status, totalPrice)),
    updateOrder: (state) => dispatch(updateOrder(state))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
