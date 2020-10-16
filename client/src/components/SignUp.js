import React, {useState}from "react";
import "./SignUp.css";
import {Form,Col,Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";




export default function SignUp(){
  
  
  // const[Datos,setDatos]=useState({
  //   Name:"",
  //   LastName:"",
  //   Email: "",
  //   Password:"",
  // })
  const[name,setName]=useState("")
  const[lastName,setlastName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

  const[Err,setErr]=useState({
    NameErr:"",
    LastNameErr:"",
    EmailErr:"",
    PasswordErr:"",
  })
  
  
  // function handleOnChange(e){
  //     setDatos({
  //       ...Datos,
  //       [e.target.name]:e.target.value
  //    })
    
      
  //  }
   
   function validateForm(){
     setErr({
    NameErr:"",
    LastNameErr:"",
    EmailErr:"",
    PasswordErr:"",
    });

     let NameErr="";
     let LastNameErr="";
     let EmailErr="";
     let PasswordErr="";
     
     let RegEx= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

     if(name.length == ""){
     NameErr= "Name is Empty"
    }
    if(lastName.length == "" ){
      LastNameErr=" LastName is empty "
    }
    if(!RegEx.test(email)){
    EmailErr="You Enter an invalid Email"
    }
    if(password.length < 5 || password.length >15){
    PasswordErr="Password must have at least 5 characters and max 15"
    }
    if(NameErr || LastNameErr ||EmailErr || PasswordErr) {
    setErr({ NameErr, LastNameErr, EmailErr, PasswordErr });
    return false;
    }else
    return true;
    
  }
  function handleSubmit(e){
    e.preventDefault()
    const valid = validateForm();
    if (valid) {
     alert("you registered successfully")
    
    
    }
  }
  return(
    <div>
    <Form className="form-box" onSubmit={handleSubmit} name="formulario">
  <Form.Row>
    <Form.Group>
    <Form.Label>Name</Form.Label>
    <Form.Control 
     type="text"
     placeholder="Enter Name" 
     value={name}
     onChange={(e)=>{setName(e.target.value)}}
     name="Name"
     />
     {Err.NameErr && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{Err.NameErr}</div>}
    </Form.Group>
  
    <Form.Group>
    <Form.Label>LastName</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="text" 
    value={lastName}
    name="LastName"
    onChange={(e)=>{setlastName(e.target.value)}}
    />
    {Err.LastNameErr && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{Err.LastNameErr}</div>}
    </Form.Group>
  </Form.Row>
  
  <Form.Group>
    <Form.Label>Email</Form.Label>
    <Form.Control 
    placeholder="ej:juanPerez@mail.com"
    value={email}
    name="Email"
    onChange={(e)=>{setEmail(e.target.value)}}
    />
    {Err.EmailErr && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{Err.EmailErr}</div>}
  </Form.Group>
  
  
  <Form.Row>
    <Form.Group>
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" 
    placeholder="password" 
    value={password}
    name="Password"
    onChange={(e)=>{setPassword(e.target.value)}}
    />
    {Err.PasswordErr && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{Err.PasswordErr}</div>}
    </Form.Group>
  </Form.Row>
  
   
  {/* <Link to="user/Catalogo"> */}
  <Button id = "1" variant="primary" type="submit" className="button" name="boton" >
    SignIn
  </Button>
  {/* </Link> */}
  </Form>
  </div>
   
  )
}