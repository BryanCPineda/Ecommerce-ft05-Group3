import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StepsCheckout from './StepsCheckout'
import ShoppingItems from '../checkout/ShoppingItems'
import './Checkout.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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

const Checkout = ({ user }) => {

  const token = localStorage.getItem('token')

  const classes = useStyles();

  return (
    <div className='form container-form'>
      {!token && !user ? <Redirect to="/user/catalogo" /> : null}
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

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect( mapStateToProps, null )(Checkout)