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
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { IconContext } from "react-icons";
import { Link, Redirect } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { connect } from "react-redux";
import AddReview from "../Reviews/AddReview.jsx";
import EditReview from "../Reviews/EditReview.jsx";
import swal from "sweetalert";
import "./Profile.css";
import {
  showCompletedOrders,
  resetPassword,
  setImageForUser,
  getImageOfUser,
} from "../../actions/userAction";
import CompletedOrderline from "./completedOrdersline";

const UserProfile = ({
  showCompletedOrders,
  user,
  order,
  resetPassword,
  setImageForUser,
  imageUser,
  getImageOfUser,
  passwordChanged,
}) => {
  const token = localStorage.getItem("token");
  const [stateRedirect, setRedirect] = useState({ redirect: null });
  const idUser = user && user.id;
  const producto = order;
  const [state, setState] = useState({
    passwordShowing: false,
    loading: false,
    modal: false,
    password: "",
    send: false,
    passwordMatch: false,
    newPassword: "",
  });
  const [baseImage, setBaseImage] = useState("");
  const [imagen, setImagen] = useState([]);

  const [show, setShow] = useState(false);

  const userId = user && user.id;

  const switchPassword = () => {
    //para mostrar o esconder el password
    setState({
      ...state,
      passwordShowing: !state.passwordShowing,
    });
  };


  useEffect(() => {
    showCompletedOrders(userId);
  }, [user]);

  useEffect(() => {
    getImageOfUser(userId);
  }, []);

  const handleCloseImg = () => setShow(false);
  const handleShowImg = () => setShow(true);

  const uploadImage = async (e, idUser) => {
    if (user) {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setBaseImage(base64);
      setImagen(base64);
      setImageForUser(base64, user.id);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const matchPass = (e) => {
    const pass1 = document.getElementById("password").value;
    const pass2 = document.getElementById("password2").value;

    if (pass1 != pass2) {
      swal(
        "Warning!",
        "Passwords don't match. Please check and send it again",
        "warning"
      );
      e.preventDefault();
      setState({
        ...state,
        passwordMatch: false,
      });
      return;
    }
    if (pass1.length < 8) {
      swal("Warning!", "Password must have at least 8 characters", "warning");
      e.preventDefault();
      return;
    }
    resetPassword(pass1);
    swal("Success!", "Password changed!", "success");
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
      {!token && !user ? <Redirect to="/user/catalogo" /> : null}
      <div className="d-flex justify-content-center" style={{ color: "white" }}>
        <div
          className="flex-orders d-flex flex-column"
          style={{ marginTop: "-350px", backgroundColor: 'white', width: '500px' }}
        >
          <p className="d-flex justify-content-center pt-5 profileFont">
            Profile
          </p>
          <br></br>
          <img
            className="image-profile"
            src={imageUser}
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "100%",
              border: "none",
              outline: "none",
              backgroundColor: "lightgray",
            }}
          ></img>

          <div className="mt-3 d-flex justify-content-end">
            <Button
              style={{
                backgroundColor: "#8a2be2",
                color: "white",
                border: "none",
              }}
              className="mr-5"
              onClick={handleShowImg}
            >
              Add photo +
            </Button>

            <Modal show={show} onHide={handleCloseImg}>
              <Modal.Header closeButton>
                <Modal.Title>Change user photo</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseImg}>
                  Close
                </Button>
                <InputGroup className="mb-3">
                  <FormControl
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    type="file"
                    onChange={(e) => {
                      uploadImage(e);
                    }}
                  />
                </InputGroup>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <p style={{ fontSize: "25px", color: "black" }} className="ml-5 content-profile-names">
              First Name: {user && user.name}
            </p>
            <p style={{ fontSize: "25px", color: "black" }} className="ml-5 content-profile-names">
              Last Name: {user && user.lastname}
            </p>
            <p style={{ fontSize: "25px", color: "black" }} className="ml-5 content-profile-names">
              Email: {user && user.email}
            </p>
            <p style={{ fontSize: "25px", color: "black" }} className="ml-5 pb-5 content-profile-names">
              Reset password:{" "}
              <Button className="button-register" onClick={handleShow} style={{height: '35px', width: '55px'}}>
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
      {order.length >= 1 ? (
        <Container style={{ marginTop: "-100px", marginBottom: "200px" }}>
          <CompletedOrderline />
        </Container>
      ) : null}
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    order: state.userReducer.allUsers,
    imageUser: state.userReducer.imageUser,
    passwordChanged: state.userReducer.passwordChanged,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
    resetPassword: (nuevaPass) => dispatch(resetPassword(nuevaPass)),
    setImageForUser: (image, userId) =>
      dispatch(setImageForUser(image, userId)),
    getImageOfUser: (userId) => dispatch(getImageOfUser(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
