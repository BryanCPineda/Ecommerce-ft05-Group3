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
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link, Redirect } from "react-router-dom";
import SignIn from "./userLogin"; //importamos el componente UserLogin (menu modal)

/*-------------redux-------------*/
import { getAllUsers, createUser } from "../../actions/userAction";
import { clearErrors } from "../../actions/errorActions";
import {welcomeEmail} from '../../actions/sendEmail';

/*--------LOGIN WHIT GOOGLE ---------*/
import {GoogleLogin, GoogleLogout } from "react-google-login";
import { FcGoogle } from 'react-icons/fc' 

/*--------LOGIN WHIT GITHUB ---------*/
import { GithubLoginButton, TwitterLoginButton } from "react-social-login-buttons";
import { VscGithub } from 'react-icons/vsc'
import Axios from "axios";
import swal from 'sweetalert';
import store from '../../store';
import { GET_ERRORS } from "../../constants/errorConstants";

class UserRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordShowing: false, //para el boton que muestra o esconde la password
      loading: false, //despues que das click en el boto ncrear cuenta se cambia a loading
      modal: false,
      name: "",
      lastname: "",
      email: "",
      password: "",
      redirect: null
    };
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for register error
      if (error.id === "REGISTER_FAIL") {
        let errorMsgs = [];
        error.msg.errors.map((ele) => errorMsgs.push(ele));
        this.setState({ msg: errorMsgs });
      } else {
        this.setState({ msg: null });
      }
    }
    if (isAuthenticated) {
      if (this.state.modal) {
        this.handleClose();
      }
    }
    // y siempre que se cambia el estado email
  }

  switchPassword = () => {
    //para mostrar o esconder el password
    this.setState({
      ...this.state,
      passwordShowing: !this.state.passwordShowing,
    });
  };

  handleClose = (e) => {
   // e.preventDefault();
    this.props.clearErrors();
    this.setState({
      modal: false,
    });
  };

  handleShow = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.props.clearErrors();
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, lastname, email, password } = this.state;
    const newUser = { name, lastname, email, password };
    // this.setState({ redirect: "/user/catalogo" })
    this.props.createUser(newUser) 
    .then(()=>{
        let status = store.getState().error.status
          if(status === 400) {
             console.log("error al ingresar datos no enviar correo")        
            }
          else{
            swal({                                                      //SE APLICA EL ENVIO DE MAILS A PARTIR DE AQUI
              title: "We send You a Email, Please check your inbox",    //SE ENVIA EL SWEET ALERT CON EL MENSAJE DE QUE EL MAIL FUE ENVIADO
            }).then(()=>{                                               
              const user = store.getState().userReducer.user            //OJO A ESTA PARTE, se debe conectar al store de redux de esta forma                                                           
                                                                        //para que traiga el estado actualizado del usuario, si no traera el 
                                                                        //estado anterior osea "null"
                this.props.welcomeEmail(user);
                                          //se despacha la accion welcomeEmail y se le envia el usuario
              })                                
          } 
    })    
     
  };

handleBoth=()=>{
    this.handleClose(); 
    this.props.handler()
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                //////////////////////// LOGIN WITH GOOGLE  ////////////////////////
   responseGoogle = (response) =>{                      //la respuesta son los datos del usuario de google autenticado
                                   // console.log(response) //si consologuean la respuesta van a ver todos los datos que devuevle google
      const allUsers = store.getState().userReducer.allUsers      //aqui traigo todos los usuarios existentes en la DB
      if (response.error){                                        //si google responde con un error, puede ser por cookies inhabilitadas
          return alert('An error has ocurred, check if cookies are blocked, please enable them')  //se pide al usuario que habilite las cookies
      }
                    //SE BUSCA SI EL EMAIL DEL LOGGIN DE GOOGLE YA SE ENCUENTRA EN LA BASE DE DATOS
      const emailIn =  allUsers.filter(user => user.email === response.profileObj.email)
                    //SI SE ENCUENTRA, HAY QUE VERIFICAR SI EL USUARIO INGRESO ANTERIORMENTE CON GOOGLE O SE INSCRIBIO A TRAVES DEL FORMULARIO
      if(emailIn.length > 0) { 
        let newGoogleUser;
             emailIn && emailIn[0].gRegister === null ?     //SI SE INSCRIBIO A TRAVES DEL FORMULARIO DEBE LOGEARSE CON SU USUARIO Y CONTRASEñA
                swal({
                  title: "This Account Has been Register by form, Please login",
                  text: "remember if you forgot the password, can recovery click on `forgot your password?`",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                })
                    .then((response) => {
                        if(response){
                              return
                        }
                    })
                  :                                                //DE LO CONTRARIO SE DESPACHA LA ACCION CREAR USUARIO QUE LO BUSCA EN LA DB Y LO RETORNA AUTENTICADO 
                   newGoogleUser = {                               //se arma un nuevo objeto con los datos que requerimos para nuesra DB
                    name: response.profileObj.givenName,          
                    lastname: response.profileObj.familyName,
                    email: response.profileObj.email,
                    password: "$2a$10$KtUH0poKeLEQ8WqZ8hjcruwXPcA7.W8O1WDtcMoAFJweRGMQxDWam", //esta password es generica para todas las cuentas de google y gitHub pues es un campo obligatorio para nuestra DB
                    image: response.profileObj.imageUrl,
                    whitGoogle: true                                  // esta ultima propiedad funciona como bandera, para indicarle a la accion "createUser" que el usuario que esta ingresando es externo a nuestra web
                  }
                  this.props.createUser(newGoogleUser)  
        }else {                                                 //SI ES LA PRIMERA VEZ QUE ESTE EMAIL SE ESTA REGISTRANDO CON GOOGLE
        
            let newGoogleUser = {                               //se arma un nuevo objeto con los datos que requerimos para nuesra DB
              name: response.profileObj.givenName,          
              lastname: response.profileObj.familyName,
              email: response.profileObj.email,
              password: "$2a$10$KtUH0poKeLEQ8WqZ8hjcruwXPcA7.W8O1WDtcMoAFJweRGMQxDWam", //esta password es generica para todas las cuentas de google y gitHub pues es un campo obligatorio para nuestra DB
              image: response.profileObj.imageUrl,
              whitGoogle: true                                  // esta ultima propiedad funciona como bandera, para indicarle a la accion "createUser" que el usuario que esta ingresando es externo a nuestra web
            }
            this.props.createUser(newGoogleUser)
            .then(()=>{                                                   //SE APLICA EL ENVIO DE MAILS A PARTIR DE AQUI
              swal({
                title: "We send You a Email, Please check your inbox",    //SE ENVIA EL SWEET ALERT CON EL MENSAJE DE QUE EL MAIL FUE ENVIADO
              }).then(()=>{                                               
                const user = store.getState().userReducer.user            //OJO A ESTA PARTE, se debe conectar al store de redux de esta forma                                                           
                                                                          //para que traiga el estado actualizado del usuario, si no traera el 
                                                                          //estado anterior osea "null"
                  this.props.welcomeEmail(user);                          //se despacha la accion welcomeEmail y se le envia el usuario
                })                                                          
            })
        
          }
     
    
  }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
                                  //////////////////////// LOGIN WITH GIHUB  ////////////////////////
//aqui la mentalidad es diferente a la de google, pues no hay un boton que me traiga los datos de gitHub, si no, que es una serie de 
//redireccionamientos a paginas Web de gitHub que no voy a poder leer automaticamente sin el ciclo de vida del componente; si no tendria que 
//presionar un boton que me lleve a la pagina de github y otro que me haga el login
  componentDidMount =  () => {           
  
  this.props.getAllUsers();                 //primero debo hacer un get de todos los usuarios para cargarlos al store de redux
    
                                             //siempre que el componente se "monte", se despacha una petion para preguntarle al back 
                                            //si es que hay datos de un usuario de gitHub actualemente
    let data;
      Axios({                             //petion para pedir los datos del usuario de github 
        method: "GET",                            //esta peticion no es un axios como los demas pues se deben habilitar las credenciales  
        withCredentials: true,                    //para que mi back me permita acceder al a informacion del usuario
        url: "http://localhost:4000/github/user", //ruta donde se piden los datos del usuario de gitHub, esto es en nuestro back
      }).then((res) => {
      
        data = res.data;                  //la respuesta de la informacion de gitHub esta en data pueden consologearlo
                          // console.log(data);
      }).then(()=>{ 

      if(data == false){                  //si el componente se monta y la respuesta del back es un false, entonces no va a hacer nada
              return console.log("No gitHub User to Login")
      }else {
                                          //de lo contrario si retorna datos, se crea un nuevo objeto, "gitHubUser" para enviarlo a la accion
          let newGitHubUser = {           //que me crea un nuevo usuario en mi DB con los datos entregados por gitHub
            name: data.username,       //lastname se debe poner igual que el name, pues gitHub entrega solo un display Name, y necesitamos pasar
            lastname: data.username,   //la validacion de sequelize que pide que el lastname no sea null
            email: data.emails ? data.emails[0].value : data.username+"@cyberfitness.com", //gitHub no retorna un correo electronico por lo cual se le crea un nuevo correo al usuario con el username de github
            password: "$2a$10$KtUH0poKeLEQ8WqZ8hjcruwXPcA7.W8O1WDtcMoAFJweRGMQxDWam", //esta password es generica para todas las cuentas de google y gitHub para pasar la validacion de sequelize
            image: data.photos[0].value,
            whitGoogle: true              //se envia la misma bandera que indica que hay un usuario logueandose externamente, se recicla la bandera de google
          }
          this.props.createUser(newGitHubUser).then(()=>{             //se despacha la accion que crea el nuevo usuario y lo loguea automaticamente
                        
                        Axios({                                     //ESTO ES MUY IMPORTANTE, como la autenticacion esta hecha por passport, hay una sesion
                            method:"POST",                            //que esta siendo manejada por cookies, entonces tenemos la sesion en la cookie, y ademas la JWT       
                            withCredentials:true,                     //que se creo cuando agregamos nuestro usuario de gitHub en la DB, por eso debemos hacer un logOut
                            url:"http://localhost:4000/github/logout" //automatico de la cookie, para que sea destruida y solo mantener la JWT para manejar la sesion del usuario.
                          }).then((res) => console.log(res));         
          }) 
      }

    })   
  }

  

  render() {
  //   if (this.state.redirect) {
  //   return <Redirect to={this.state.redirect} />
  // }
    return (
      <React.Fragment>
        <Button className="button-register" onClick={this.handleShow}>
          Sign up
        </Button>

        <Modal
          show={this.state.modal}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header
            style={{ backgroundColor: "#8a2be2", color: "white" }}
            closeButton={true}
          >
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.msg &&
              this.state.msg.map((ele, id) => (
                <Alert key={id} variant="danger">
                  {ele}
                </Alert>
              ))}
            <Form>
              <Form.Group>
                <Form.Label>Name </Form.Label>
                <Form.Control
                  // ref={register()}
                  autoComplete="off"
                  name="name"
                  onChange={this.onChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Lastname </Form.Label>
                <Form.Control
                  // ref={register()}
                  autoComplete="off"
                  name="lastname"
                  onChange={this.onChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  // onChange={onChangeEmail}
                  // ref={register()}
                  autoComplete="off"
                  name="email"
                  onChange={this.onChange}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <IconContext.Provider
                  value={
                    this.state.passwordShowing
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
                      Password
                    </span>{" "}
                    {this.state.passwordShowing ? (
                      <BiHide
                        type="button"
                        onClick={() => this.switchPassword()}
                        title="Hide Password"
                      />
                    ) : (
                      <BiShowAlt
                        type="button"
                        onClick={() => this.switchPassword()}
                        title="Show Password"
                      />
                    )}
                  </Form.Label>
                </IconContext.Provider>
                <Form.Control
                  // onChange={onChangePassword}
                  // ref={register()}
                  autoComplete="off"
                  name="password"
                  onChange={this.onChange}
                  type={this.state.passwordShowing ? "text" : "password"}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="d-flex justify-content-between">
                <span>
                  ¿Do you have an account?{"     "}
                  <Button
                    onClick={this.handleBoth}
                    className="button-register mt-1"
                    style={{ width: "4rem" }}
                  >
                    Login
                  </Button>
                </span>
                <Button
                  disabled={this.state.loading}
                  type="submit"
                  onClick={this.onSubmit}
                  className="button-register mt-1"
                  style={{ width: "9rem" }}
                >
                  {this.state.loading ? "Loading..." : "Create Account"}
                </Button>
              </Form.Group>
              <div
                className="d-flex justify-content-end"
                style={{ marginTop: "35px" }}
              >
                <button
                  className="btn"
                  style={{ backgroundColor: "#8a2be2", color: "white" }}
                  onClick={(e) => { e.preventDefault();
                                      this.handleClose(); 
                    }}
                >
                  Close
                </button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center flex-column">
            <p style={{ fontSize: "20px" }}>Sign up with</p>
            {/*///////////////////////////////////////////////////////////////////////////////////*/}
            {/*LOGIN WHIT GITHUB*/}
           
            {/** BOTON DE GITHUB SOLO ES VISUAL NO HACE NADA  **/}
            <div style={{ backgroundColor: 'black', height: '50px', width: '180px' }} className="d-flex justify-content-center align-items-center">
              <a style={{ color: 'white' }} className="login-with-github" href="http://localhost:4000/gitHub"><span style={{fontSize: '21px'}} className="mr-2"><VscGithub /></span>Sign up with Github </a>
            </div>
            
            {/** BOTON DE REDIRECCIONAMIENTO A GITHUB PARA HACER LA AUTENTICACION DESDE SU PAGINA  **/}
            {/*///////////////////////////////////////////////////////////////////////////////////*/}
            {/*LOGIN WHIT GOOGLE*/}
            <div >
            <GoogleLogin //LIBRERIA QUE TIENE IMPLEMETANDO EL BOTON PARA LOGUEARSE CON GOOGLE
              clientId="807609632644-ken5ulpg4t4gjuinurpjfuif4ord8e0s.apps.googleusercontent.com" //ESTE ID SE CREA EN console.developers.google.com -> CREDENCIALES, leer documentacion sobre como crear un OAuth con google Credencials
              buttonText="Sign up with Google" //EL TEXTO DEL NOMBRE DEL BOTON
              onSuccess={this.responseGoogle} //SI LA RESPUESTA DE GOOGLE FUE EXITOSA SE LLAMA A LA FUNCION
              onFailure={this.responseGoogle} //SI LA RESPUES DE GOOGLE FALLA, SE LLAMA A LA FUNCION
              cookiePolicy={"single_host_origin"} //SE HABILITAN LAS COOKIES PARA NUESTRO SITIO WEB
              className="botton-google-register"
              //   isSignedIn={true}                              //MANTIENE LA SESION INICIADA CON COOKIES NO LO NECESITAMOS PORQUE USAMOS JWT
            />
            </div>
              <a href="http://localhost:4000/twitter" style={{ textDecoration: 'none' }}>
                <TwitterLoginButton/>
              </a>
            <div>
            </div>
            {/*//////////////////////////////////////////////////////////////////////////////////*/}
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.userReducer.users,
    error: state.error,
    isAuthenticated: state.userReducer.isAuthenticated,
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    createUser: (user) => dispatch(createUser(user)),
    clearErrors: () => dispatch(clearErrors()),
    welcomeEmail: (user) => dispatch(welcomeEmail(user)), 
    getAllUsers: () => dispatch(getAllUsers()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
