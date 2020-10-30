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
import { IconContext } from "react-icons";
import { BiShowAlt, BiHide } from "react-icons/bi";

import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import swal from 'sweetalert'; 
import {getAllUsers, userForgotPassword} from '../../actions/userAction';
import {forgotPasswordEmail} from '../../actions/sendEmail';
import store from '../../store';
import { AiOutlineConsoleSql } from "react-icons/ai";

const bcrypt = require('bcryptjs');
 

function PasswordResetLink ({getAllUsers, userForgotPassword,  } ) {

const [stateRedirect, setRedirect] = useState({ redirect: null })

const [state, setState] = useState({
    passwordShowing: false,
    ableForReset: false,
    password:'',
     
}) 

const [user, setStateUser] = useState()

useEffect(()=>{
    
    getAllUsers().then(()=>{
            let path = window.location.search
            if(path === "") setRedirect({ redirect: "/user/catalogo" })
            else if(path.slice(0,1) !== '?') setRedirect({ redirect: "/user/catalogo" })
            else {
                        path = path.slice(1,);
                        const allUsers = store.getState().userReducer.allUsers;
                        let code = 0;
                       if( localStorage.getItem("code") !== null ){
                         code = localStorage.getItem('code')
                       }
                        let match = false;           
                             allUsers.map( async (user) =>{      
                                     bcrypt.compare(code.toString()+user.email, path)
                                         .then( (response)=>{
                                            if(response){
                                                match = user;               
                                                setStateUser(match);
                                            }
                                        })
                            })
                              
                                                       
            }
}) 
},[])

const onChange = (e) => {
    setState({
      [e.target.name]: e.target.value
    });

    if(!user){
        swal({
            title: "You are not able for Reset the password, please check your email link",
          }).then(()=>{
                setRedirect({ redirect: "/user/catalogo" })
          })
        
    } 
};

const switchPassword = () => {
    //para mostrar o esconder el password
    setState({
      ...state,
      passwordShowing: !state.passwordShowing,
    });

};

const handleClick = () =>{

    if(state.password.length < 8){
    swal({
        title: "Password must Have at least 8 characters",
      })
    }
    else{
        swal({
            title: "Your password has been change, you can login now",
          }).then(()=>{
            userForgotPassword(user.id, state.password);
            localStorage.removeItem('code');
            setTimeout(() => {
                setRedirect({ redirect: "/user/catalogo" })
            }, 1000);  
            })    
    }
}

  
if (stateRedirect.redirect) {
    return <Redirect to={stateRedirect.redirect} />
  }

  return (
     <div>
          <Form>
              <Form.Group>
                <IconContext.Provider
                  value={
                    state.passwordShowing
                      ? { className: "icon-change" }
                      : { className: "icon" }
                  }
                >
                  <Form.Label>
                    <span
                      style={{
                        marginRight: "0.125rem",
                      }}
                    >
                    New Password
                    </span>{" "}
                    {state.passwordShowing ? (
                      <BiHide
                        type="button"
                        onClick={() => switchPassword()}
                        title="Hide Password"
                      />
                    ) : (
                      <BiShowAlt
                        type="button"
                        onClick={() => switchPassword()}
                        title="Show Password"
                      />
                    )}
                  </Form.Label>
                </IconContext.Provider>
                <Form.Control
                   onChange={onChange}
                  autoComplete="off"
                  name="password"
                  type={state.passwordShowing ? "text" : "password"}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="d-flex justify-content-end">        
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
                onClick={(e) => handleClick(e.preventDefault()) }
                className="button-register mt-1"
                style={{ width: "5rem" }}
                >
                 Submit
                </Button>
              </Form.Group>
            </Form>
           
     </div>
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
    userForgotPassword: (id, newPassword) => dispatch(userForgotPassword(id, newPassword)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetLink);