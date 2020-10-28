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
  FormControl
} from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { BsFillDashCircleFill, BsCheck } from "react-icons/bs";
import { connect } from "react-redux";
import AddReview from "../Reviews/AddReview.jsx";
import EditReview from "../Reviews/EditReview.jsx";
import "./Profile.css";
import { showCompletedOrders, setImageForUser, getImageOfUser } from "../../actions/userAction";
import CompletedOrderline from "./completedOrdersline";

const UserProfile = ({ showCompletedOrders, user, order, setImageForUser, imageUser, getImageOfUser }) => {

  const [baseImage, setBaseImage] = useState("");
  const [imagen, setImagen] = useState([]);

  const [show, setShow] = useState(false);

  const userId = user && user.id

  useEffect(() => {
    if(user){
      showCompletedOrders(user.id);
    }
  }, []);

  useEffect(() => {
    getImageOfUser(userId);
  }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const uploadImage = async (e, idUser) => {
    if(user) {
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

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center" style={{ color: "white" }}>
        <div
          className="flex-orders flex-column d-flex justify-content-center"
          style={{
            marginTop: "-350px",
            backgroundColor: "white",
            width: "500px",
          }}
        >
          <p
            style={{ color: "black", fontSize: "40px" }}
            className="d-flex justify-content-center"
          >
            Profile:
          </p>
          <br></br>
          
          <img className="image-profile" src={imageUser}
          style={{width: '300px', height: "300px", borderRadius: "100%", border: 'none', outline: 'none', backgroundColor: 'lightgray'}}></img>

          <div className="mt-3 d-flex justify-content-end">
            <Button variant="primary" onClick={handleShow}>
             Add photo +
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change user photo</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
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

          <div className="mt-5">
            <p style={{ fontSize: "25px", color: "black" }}>
              First Name: {user && user.name}
            </p>
            <p style={{ fontSize: "25px", color: "black" }}>
              Last Name: {user && user.lastname}
            </p>
            <p style={{ fontSize: "25px", color: "black" }}>
              Email: {user && user.email}
            </p>
          </div>
        </div>
      </div>
      {order.length >= 1 ?
      <Container style={{ marginTop: "-100px", marginBottom: '200px' }}>
        <CompletedOrderline />
      </Container>
      :
      null
      }  
    </React.Fragment>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    order: state.userReducer.allUsers,
    imageUser: state.userReducer.imageUser,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    showCompletedOrders: (idUser) => dispatch(showCompletedOrders(idUser)),
    setImageForUser: (image, userId) => dispatch(setImageForUser(image, userId)),
    getImageOfUser: (userId) => dispatch(getImageOfUser(userId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
