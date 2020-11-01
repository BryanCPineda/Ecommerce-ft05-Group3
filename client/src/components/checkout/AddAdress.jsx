import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { IoMdSend } from "react-icons/io";

import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

 function AddressForm({user, handleBan}) {

  console.log('ban in adress', handleBan)

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange"
  });
  const onSubmit = () => {
    handleBan(false)
  };

  const [state, setState] = useState(JSON.parse(localStorage.getItem('adress')))

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state,
      [e.target.name]: e.target.value})
    }

  const addLocalStorage = () =>{
    console.log('localstorage', state)
    if(!localStorage)localStorage.setItem('adress', {})
      localStorage.setItem('adress', JSON.stringify(state))
  }

  useEffect(() => {
    addLocalStorage()
  }, [state])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            defaultValue={state ? state.name : user && user.name}
            helperText="Name"
            autoComplete='Name'
            fullWidth
            onChange={handleChange}
            ref={register({
              required: "this is a required",
            })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name='lastname'
            defaultValue={state ? state.lastname : user && user.lastname}
            helperText="Last Name"
            autoComplete='Last Name'
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            defaultValue={state ? state.address1 : ''}
            helperText="Address"
            fullWidth
            autoComplete="shipping address-line1" 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            defaultValue={state ? state.city : ''}
            helperText="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          required
          id="state" name="state" helperText="State/Province/Region" 
          defaultValue={state ? state.state : ''}
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            defaultValue={state ? state.zip : ''}
            helperText="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            defaultValue={state ? state.country : ''}
            helperText="Country"
            fullWidth
            autoComplete="shipping country"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
      <Button className='boton'>
         <Input value='Send' type="submit" disableUnderline={true} />    <IoMdSend />
      </Button>
      </form>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
    return {
      user: state.userReducer.user,
      isAuthenticated: state.userReducer.isAuthenticated
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {

    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);