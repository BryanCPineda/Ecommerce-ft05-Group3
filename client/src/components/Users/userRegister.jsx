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

/*--------LOGIN WHIT GOOGLE ---------*/
import {GoogleLogin, GoogleLogout } from "react-google-login"; 

/*--------LOGIN WHIT GITHUB ---------*/
import { GithubLoginButton } from "react-social-login-buttons";

class UserRegister extends React.Component {
  constructor() {
    super();

    this.state = {
      passwordShowing: false, //para el boton que muestra o esconde la password
      loading: false, //despues que das click en el boto ncrear cuenta se cambia a loading
      modal: false,
      name: "",
      lastname: "",
      email: "",
      password: "",
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

  handleClose = () => {
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
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, lastname, email, password } = this.state;
    const newUser = { name, lastname, email, password };
    this.props.createUser(newUser);
  };

    // LOGUIN WHIT GOOGLE 
   responseGoogle = (response) =>{
   
    let newGoogleUser = {
      name: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      email: response.profileObj.email,
      password: "$2a$10$KtUH0poKeLEQ8WqZ8hjcruwXPcA7.W8O1WDtcMoAFJweRGMQxDWam", //esta password es generica para todas las cuentas de google
      image: response.profileObj.imageUrl,
      whitGoogle: true
    }
    this.props.createUser(newGoogleUser)


  }





  render() {
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
                <span className="mt-2">
                  ¿Do you have an account?{"     "}
                  <span
                    class="nav-cta nav-sign"
                    onClick={() => this.handleClose}
                  >
                    <SignIn />{" "}
                  </span>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
                      <h6> --------- OR ---------</h6>
                      {/*LOGIN WHIT GITHUB*/}

          <GithubLoginButton onClick={() => alert("este boton aun no hace nada")} />

                      {/*LOGIN WHIT GOOGLE*/}
                  
                      <GoogleLogin 
                        clientId="807609632644-ken5ulpg4t4gjuinurpjfuif4ord8e0s.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={"single_host_origin"}
              //   isSignedIn={true}               //mantiene la sesion iniciada 
                       /> 
            
            
            <button
              className="btn"
              style={{ backgroundColor: "#8a2be2", color: "white" }}
              onClick={this.handleClose}
            >
              Close
            </button>
                      
            



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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    createUser: (user) => dispatch(createUser(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
