import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import NumberFormat from 'react-number-format'
import './Checkout.css'

import { connect } from "react-redux";
import {

  cambioEstadoCarrito,
  getProductsForCheckout
} from "../../actions/order";
import { useEffect } from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



function ShoppingItems({ cart, user, getProductsForCheckout}) {

  const classes = useStyles();

  useEffect(()=>{ 
    if(user){
        getProductsForCheckout(user.id)
    }
  },[user]) 

  useEffect(()=>{ 
      
  },[getProductsForCheckout]) 

  return (
    <TableContainer component={Paper} >
      <Table className='title' aria-label="simple table">
        <TableHead>
            <TableRow>
                <Typography variant="h5" gutterBottom>
                    Your Purchase
                </Typography>
            </TableRow>
          <TableRow className='boton'>
            <TableCell align="center">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.product ? cart.product.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                    <NumberFormat
                                prefix="$"
                                value={row.price}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                displayType={"text"}
                                className={'number'}
                            />
                  </TableCell>
              <TableCell align="right">
              <NumberFormat
                                value={row.orderline.quantity}
                                decimalScale={0}
                                fixedDecimalScale={true}
                                displayType={"text"}
                                className={'number'}
                            />
              </TableCell>
              <TableCell align="right">
              <NumberFormat
                                prefix="$"
                                value={row.price * row.orderline.quantity}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                displayType={"text"}
                                className={'number'}
                            />
                  </TableCell>
            </TableRow>
          )): 'No products'}
        </TableBody>
        <TableRow>
            <TableCell>
                <Typography variant="h5" gutterBottom>
                    Total
                </Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <NumberFormat
                                className='font-title'
                                prefix="$"
                                value={cart.totalPrice}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                displayType={"text"}
                                className={'number'}
                            />
                </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
}

function mapStateToProps(state) {
    return {
      cart: state.orderReducer.cartProducts,
      user: state.userReducer.user,
      isAuthenticated: state.userReducer.isAuthenticated
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      cambioEstadoCarrito: (id, status) =>
      dispatch(cambioEstadoCarrito(id, status)),
      getProductsForCheckout: (idUser) => dispatch(getProductsForCheckout(idUser))
      
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItems);