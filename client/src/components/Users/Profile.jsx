import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { IconContext } from "react-icons";
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { connect } from "react-redux";
import AddReview from "../Reviews/AddReview.jsx";
import EditReview from "../Reviews/EditReview.jsx";
import "./Profile.css";
import { showCompletedOrders, resetPassword } from "../../actions/userAction";
import CompletedOrderline from "./completedOrdersline";

const UserProfile = ({ showCompletedOrders, user, order, resetPassword }) => {
  const idUser = user && user.id;
  const producto = order;
  const [state, setState] = useState({
    passwordShowing: false,
    loading: false,
    modal: false,
    password: "",
    send: false,
  });
  const switchPassword = () => {
    //para mostrar o esconder el password
    setState({
      ...state,
      passwordShowing: !state.passwordShowing,
    });
  };

  const matchPass = (e) => {
    const pass1 = document.getElementById("password").value;
    const pass2 = document.getElementById("password2").value;

    if (pass1 != pass2) {
      alert("Passwords don't match. Please check and send it again.");
      e.preventDefault();
      return false;
    }
    return true;
  };
  const handleClose = () => {
    if (state.modal) {
      state.modal = false;
    }
    setState({
      modal: false,
    });
  };
  const handleShow = () => {
    setState({
      modal: !state.modal,
    });
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center" style={{ color: "white" }}>
        <div
          className="flex-orders d-flex flex-column"
          style={{ marginTop: "-350px" }}
        >
          <p style={{ color: "white", fontSize: "40px" }}>
            Personal information:
          </p>
          <br></br>
          <div>
            <p style={{ fontSize: "25px" }}>First Name: {user && user.name}</p>
            <p style={{ fontSize: "25px" }}>
              Last Name: {user && user.lastname}
            </p>
            <p style={{ fontSize: "25px" }}>Email: {user && user.email}</p>
            <p style={{ fontSize: "25px" }}>
              Reset password:{" "}
              <Button className="button-register" onClick={handleShow}>
                Here
              </Button>
              <Modal
                show={state.modal}
                onHide={handleClose}
                backdrop="true"
                keyboard={true}
              >
                <Modal.Header
                  style={{ backgroundColor: "#8a2be2", color: "white" }}
                >
                  <Modal.Title>Change password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                          {state.passwordShowing === false ? (
                            <BiHide
                              type="button"
                              onClick={switchPassword}
                              title="Hide Password"
                            />
                          ) : (
                            <BiShowAlt
                              type="button"
                              onClick={switchPassword}
                              title="Show Password"
                            />
                          )}
                        </Form.Label>
                      </IconContext.Provider>
                      <Form.Control
                        autoComplete="off"
                        name="password"
                        id="password"
                        //onChange={(e) => onChange(e)}
                        type={state.passwordShowing ? "text" : "password"}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        <span
                          style={{
                            marginRight: "0.125rem",
                          }}
                        >
                          Confirm New Password
                        </span>{" "}
                      </Form.Label>
                      <Form.Control
                        autoComplete="off"
                        name="passwordConfirm"
                        id="password2"
                        type={state.passwordShowing ? "text" : "password"}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-end">
                      <Button
                        // disabled={this.state.loading}
                        type="submit"
                        onClick={(e) => matchPass(e)}
                        className="button-register mt-1"
                        style={{ width: "5rem" }}
                      >
                        Submit
                        {/* {this.state.loading ? "Loading..." : "Sign In"} */}
                      </Button>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#8a2be2", color: "white" }}
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </Modal.Footer>
              </Modal>{" "}
            </p>
          </div>
        </div>
      </div>
      <Container style={{ marginTop: "-300px" }}>
        <CompletedOrderline />
      </Container>
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    order: state.userReducer.allUsers,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
    resetPassword: (newPassword) => dispatch(resetPassword(newPassword)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
