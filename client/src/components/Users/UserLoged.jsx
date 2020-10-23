import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { IoMdTrash, IoMdPhotos, IoIosCart } from "react-icons/io";
import NumberFormat from "react-number-format";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import "./UserLoged.css";
import Logout from "./Logout";
//import UserProfile from "./Profile";

//-------------- Redux ------------------------
import { connect } from "react-redux";

const UserLoged = ({ user }) => {
  return (
    <DropdownButton id="user-loged" title={user.name}>
      <Dropdown.Item id="user-loged-profile"><Link to="/user/profile">
        <Button className="button" style={{ backgroundColor: "#8a2be2" }}>Profile</Button>
        </Link></Dropdown.Item>

    <button style={{border: 'none', marginLeft: '2rem'}} onClick={() => window.location.reload()}><Logout/></button>
    </DropdownButton>
  );
};

function mapStateToProps(state) {
  return {
    /* user: state.userReducer.user */
  };
}

function mapDispatchToProps(dispatch) {
  return {
    /* loadUser: () => dispatch(loadUser()),  */
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoged);
