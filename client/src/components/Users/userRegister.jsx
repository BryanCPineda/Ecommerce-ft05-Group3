import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Container,
  Modal,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link, Redirect } from "react-router-dom";

/*-------------redux-------------*/
import { getAllUsers, createUser } from "../../actions/userAction";

function UserRegister({ getAllUsers, allUsers, createUser }) {
  //recibe las props y conexxion a redux

  /*---------modal---------*/
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*---------modal---------*/

  const [state, setState] = useState({
    passwordShowing: false, //para el boton que muestra o esconde la password
    passwordShowing2: false,
    loading: false, //despues que das click en el boto ncrear cuenta se cambia a loading
    diferentPassword: false,
    password: "", //el estado de la primer password para comparar con la segunda y ver qeu sean iguales
    password2: "", //segunda password para comprobar que sea igual que la primera
    email: "", //estado de email para verificar que no exista en la base de datos
    allUsers: [], //estado que tiene todos los usuarios de la base de datos para poder buscar adentro el email
  });

  useEffect(() => {
    getAllUsers(); //el use efec trae todos los usuarios de la base de datos cuando se monta el componente
    //y siempre que se cambia el estado email
  }, [state.email]);

  const { register, handleSubmit } = useForm(); //para poder hacer handle submit y que guarde el registro del input el boostrap form

  const switchPassword = () => {
    //para mostrar o esconder el password
    setState({
      ...state,
      passwordShowing: !state.passwordShowing,
    });
  };
  const switchPassword2 = () => {
    //para mostrar o esconder el password 2
    setState({
      ...state,
      passwordShowing2: !state.passwordShowing2,
    });
  };

  const onChangePassword = (data) => {
    //siempre que se cambie el password se setea en el estado
    setState({
      ...state,
      password: data.target.value,
    });
  };
  const onChangePassword2 = (data) => {
    //siempre que se cambie el password2 se setea en el estado
    setState({
      ...state,
      password2: data.target.value,
    });
  };
  const onChangeEmail = (data) => {
    //siempre que se cambie el email input se setea en el estado
    setState({
      ...state,
      email: data.target.value,
      allUsers: allUsers.rows,
    });
  };

  const onSubmit = (data) => {
    //cuando se haga el submit recibe todos los inputs en data

    state.allUsers &&
      state.allUsers.map((user) => {
        //se busca dentro del arreglo de usuarios el email del input
        if (user.email == state.email) {
          console.log("email en uso"); //si esta el email envia el mensaje que esta en uso
        }
      });

    if (state.password === state.password2) {
      //se comparan las password, si son identicas se crea el usuario
      createUser(data);
    } else console.log("password are diferent"); //si no son identicas envia el mensaje que son diferentes
  };

  return (
    <React.Fragment>
      <Button className="button"  onClick={handleShow}>
        Sign Up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{backgroundColor: '#8a2be2', color: 'white'}} closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Name </Form.Label>
              <Form.Control
                ref={register()}
                autoComplete="off"
                name="name"
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>LastName </Form.Label>
              <Form.Control
                ref={register()}
                autoComplete="off"
                name="lastName"
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={onChangeEmail}
                ref={register()}
                autoComplete="off"
                name="email"
              ></Form.Control>
            </Form.Group>

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
                    Password
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
                onChange={onChangePassword}
                ref={register()}
                autoComplete="off"
                name="password"
                type={state.passwordShowing ? "text" : "password"}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <IconContext.Provider
                value={
                  state.passwordShowing2
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
                    Confirm Password
                  </span>{" "}
                  {state.passwordShowing2 ? (
                    <BiHide
                      type="button"
                      onClick={() => switchPassword2()}
                      title="Hide Password"
                    />
                  ) : (
                    <BiShowAlt
                      type="button"
                      onClick={() => switchPassword2()}
                      title="Show Password"
                    />
                  )}
                </Form.Label>
              </IconContext.Provider>
              <Form.Control
                onChange={onChangePassword2}
                ref={register()}
                autoComplete="off"
                name="confirmPassword"
                type={state.passwordShowing2 ? "text" : "password"}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="d-flex justify-content-between">
              <span>
                ¿Do you have an account?{"     "}
                <Link className="link" to="/login">
                  Sign In
                </Link>
              </span>
              <Button disabled={state.loading} type="submit" className="button" style={{width: '11rem'}} >
                {state.loading ? "Loading..." : "Create Account"}
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.userReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    createUser: (user) => dispatch(createUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
