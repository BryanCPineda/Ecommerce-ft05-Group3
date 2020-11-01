import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import PaypalCheckoutButton from './PaypalCheckoutButton';
import { Button, Form } from 'react-bootstrap';
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";

 const PaymentForm = ({ order, user, total, handleBan }) => {

  const [card, setCard] = useState(false)
  const [state, setState] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: ""
  })
  const [focus, setFocus] = useState('')

  const totalPrice = total
  const customer = `${user.name} ${user.lastname}`

//   const itemsQuantity = order.orderlines.map(ele => 
//      return ele
// )

  // console.log('quantity', itemsQuantity)

  const items = order.product && order.product.map((ele, index) => {
    const pricePaypal = ele.orderline.quantity * ele.price
    console.log("precio paypal" ,pricePaypal)
    return ele={
      // sku: ele.id,
      name: ele.name,
      price: ele.price,
      quantity: ele.orderline.quantity,
      currency: 'USD'
    }
  })

   const orderPaypal = {
     total: totalPrice,
     customer: customer,
     items: items,
   }
   const { register, errors, handleSubmit } = useForm({
    mode: "onChange"
  });

   const onSubmit = () => {
     console.log("hola")
    handleBan(false)
  }; 

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

    const { name, number, expiry, cvc } = state

    const arrayPayment = [ name, number, expiry, cvc ]
    localStorage.setItem('payment', JSON.stringify(arrayPayment))

  return (
    <React.Fragment>
      <div>
        <div>
          <PaypalCheckoutButton order={orderPaypal} handleBan={handleBan}/>
        </div>
        <div>
          <Button style={{backgroundColor: '#8a2be2', border: 'none'}} onClick={() => setCard(!card)}>Credit/Debit Card</Button>
        </div>
        <div>
        <Button className="mt-3" style={{backgroundColor: '#8a2be2', border: 'none'}} onClick={onSubmit}>Send</Button>
        </div>
      </div>
      {card ? (
        <>
        <div className="mt-3">
        <Cards number={state.number} name={state.name} expiry={state.expiry} cvc={state.cvc} focused={focus} />
        </div>
          <Typography variant="h6" gutterBottom>
            Payment method
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
                name="name"
                value={state.name}
                onChange={handleOnChange}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                name="number"
                id="number"
                label="Card number"
                type="tel"
                fullWidth
                value={state.number}
                autoComplete="cc-number"
                onChange={handleOnChange}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
                name="expiry"
                value={state.expiry}
                onChange={handleOnChange}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                name="cvc"
                id="cvc"
                label="CVC"
                helperText="Last three digits on signature strip"
                fullWidth
                value={state.cvc}
                autoComplete="cc-csc"
                onChange={handleOnChange}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveCard" value="yes" />
                }
                label="Remember credit card details for next time"
              />
            </Grid>
            
          </Grid>
        </>
      ) : null}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    total: state.orderReducer.cartProducts.totalPrice,
    order: state.orderReducer.cartProducts,
    user: state.userReducer.user
  }
}

export default connect( mapStateToProps, null )(PaymentForm)