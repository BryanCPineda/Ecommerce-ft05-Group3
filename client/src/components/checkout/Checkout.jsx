import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StepsCheckout from './StepsCheckout'
import ShoppingItems from '../checkout/ShoppingItems'
import './Checkout.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperp: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: '#8a2be2',
        color: 'white',
  }
}));

export default function Checkout() {
  const classes = useStyles();

  return (
    <div className='form container-form'>
      <Grid container spacing={3}>
        <Grid item xs={12} className='form-title'>
          <Paper className={classes.paperp}>Checkout</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
                <ShoppingItems />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
                <StepsCheckout />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}