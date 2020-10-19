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

/*-------------redux-------------*/
import { getAllUsers, createUser } from "../../actions/userAction";
import { clearErrors } from "../../actions/errorActions";

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
    const { error } = this.props;
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
    if (this.props.user) {
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
          <Modal.Header style={{ backgroundColor: "#8a2be2", color: "white" }}>
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
                  <Link className="link" to="/login">
                    Sign In
                  </Link>
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
            <button className="btn" style={{backgroundColor: '#8a2be2', color: 'white'}} onClick={this.handleClose}>
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
    user: state.userReducer.user
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
