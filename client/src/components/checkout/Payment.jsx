import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import PaypalCheckoutButton from './PaypalCheckoutButton';
import { IoMdSend } from "react-icons/io";
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

 const PaymentForm = ({ order, user, total, handleBan }) => {

  const [card, setCard] = useState(false)
  const [state, setState] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  })

  const totalPrice = total
  const customer = `${user.name} ${user.lastname}`

//   const itemsQuantity = order.orderlines.map(ele => 
//      return ele
// )

  // console.log('quantity', itemsQuantity)

  const items = order.product.map((ele, index) => {
    console.log(ele)
    return ele={
      // sku: ele.id,
      name: ele.name,
      price: ele.price,
      quantity: order.orderlines[index].quantity,
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
    handleBan(false)
  }; 

  const handleOnChange = (e) => {
    setState({ ...state,
      [e.target.name]: e.target.value})
    }

    const { name, cardNumber, expiry, cvv } = state

    const arrayPayment = [ name, cardNumber, expiry, cvv ]
    localStorage.setItem('payment', JSON.stringify(arrayPayment))

  return (
    <React.Fragment>
      <div>
      <div>
        <PaypalCheckoutButton order={orderPaypal} handleBan={handleBan}/> 
      </div>
      <div>
        <Button onClick={() => setCard(!card)}>Credit/Debit Card</Button>
      </div>
      </div>
      {card ?
      <>
        <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" name="name" onChange={handleOnChange}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cardNumber"
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" name="expiry" onChange={handleOnChange}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="cvv"
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
      <Button className='boton'>
         <Input value='Send' type="submit" disableUnderline={true} />    <IoMdSend />
      </Button>
      </form>
      </>
        : 
        null
      }
      
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