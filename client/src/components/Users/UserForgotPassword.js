import {
    Card,
    Form,
    Button,
    Row,
    Col,
    Container,
    Modal,
    Alert,
  } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert'; 
import {getAllUsers} from '../../actions/userAction';
import {forgotPasswordEmail} from '../../actions/sendEmail';
import bcrypt from 'bcryptjs' 

function UserForgotPassword ({getAllUsers, allUsers, forgotPasswordEmail} ) {
  
    useEffect(() => {
    
      getAllUsers()

      }, []);

const [stateRedirect, setRedirect] = useState({ redirect: null })

const [state, setState] = useState({
        email: '',
        allUsers: []
})

const onChange = (e) => {
    setState({
      [e.target.name]: e.target.value,
      allUsers: allUsers
    }); 
  };

const submitEmail = () =>{

    const emailIn = state.allUsers.filter(user => user.email == state.email)
     if(emailIn.length === 0) {
        swal({
            title: "This Email is not found ir our Data Base",
          })
        
    }else {
        swal({
            title: "We send you a Email, please Check your inbox",    //SE ENVIA EL SWEET ALERT CON EL MENSAJE DE QUE EL MAIL FUE ENVIADO
        }).then(()=>{
            let num = Math.floor((Math.random() * 9999) + 1);
                        
            localStorage.setItem('code', num.toString())

            let numPlusEmail = num.toString()+emailIn[0].email
           
                bcrypt.hash(numPlusEmail,10)   //ANTES HASHEANDO SOLO EL EMAIL emailIn[0].email,10
                    .then((emailHashed)=>{                       
                        const user = {
                                id: emailIn[0].id,
                                name: emailIn[0].name,
                                lastname: emailIn[0].lastname,
                                email: emailIn[0].email,
                                emailHashed: emailHashed,                         
                        }

                        forgotPasswordEmail(user) 

                        setTimeout(() => {
                            setRedirect({ redirect: "/user/catalogo" })
                        }, 1000); 
                     })
                
            }) 
    }
}
 
if (stateRedirect.redirect) {
    return <Redirect to={stateRedirect.redirect} />
  }

  return (
     <Container style={{marginTop: '-300px', width: '600px', height: '200px', backgroundColor: 'white'}} className="d-flex justify-content-center">
       <div style={{width: '400px'}}>
         <Form.Group>
                <Form.Label className="pt-5" style={{fontSize: '20px'}}>Please Write your Email </Form.Label>
                <Form.Control
                    onChange={(e) => onChange(e)}
                    autoComplete="off"
                    name="email"
                ></Form.Control>
            </Form.Group> 
            <Form.Group>
            <Button
                type="submit"
                onClick={() => setRedirect({ redirect: "/user/catalogo" }) }  
                className="button-register mt-1"
                style={{ width: "5rem" }}
              >
               CANCEL
              </Button>
              
              <Button
                type="submit"
                onClick={() => submitEmail() }
                className="button-register mt-1 ml-3"
                style={{ width: "5rem" }}
              >
               SUBMIT
              </Button>
            </Form.Group>
            </div>
     </Container>
  );
};
function mapStateToProps(state) {
  return {
    allUsers: state.userReducer.allUsers
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    forgotPasswordEmail: (user) => dispatch(forgotPasswordEmail(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForgotPassword);