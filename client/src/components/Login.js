import React, {useState}from "react";
import "./Login.css";
import {Form,Col,Button} from "react-bootstrap";
import { Link } from "react-router-dom";




export default function Login(){
    const[Datos,setDatos]=useState({
      Name:"",
      LastName:"",
      Email: "",
      Password:"",
    })

    const[Err,setErr]=useState({
      NameErr:"",
      LastNameErr:"",
      EmailErr:"",
      PasswordErr:"",
    })
    
    
    function handleOnChange(e){
        setDatos({
          ...Datos,
          [e.target.name]:e.target.value
       })
        
            
     }
     
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

       if(Datos.Name.length == ""){
         NameErr= "Name is Empty"
        }
        if(Datos.LastName.length == "" ){
          LastNameErr=" LastName is empty "
      }
      if(!RegEx.test(Datos.Email)){
        EmailErr="You Enter an invalid Email"
      }
      if(Datos.Password.length < 5 || Datos.Password.length >15){
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
          window.location = 'user/Catalogo';
        
        
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
       value={Datos.Name}
       onChange={handleOnChange}
       name="Name"
       />
       {Err.NameErr && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{Err.NameErr}</div>}
      </Form.Group>
    
      <Form.Group>
      <Form.Label>LastName</Form.Label>
      <Form.Control 
      type="text" 
      placeholder="text" 
      value={Datos.LastName}
      name="LastName"
      onChange={handleOnChange}/>
      {Err.LastNameErr && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{Err.LastNameErr}</div>}
      </Form.Group>
    </Form.Row>
    
    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control 
      placeholder="ej:juanPerez@mail.com"
      value={Datos.Email}
      name="Email"
      onChange={handleOnChange}
      />
      {Err.EmailErr && <div className="mt-2" style={{color: 'red', fontSize: 14}}>{Err.EmailErr}</div>}
    </Form.Group>
    
    
    <Form.Row>
      <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" 
      placeholder="password" 
      value={Datos.Password}
      name="Password"
      onChange={handleOnChange}
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