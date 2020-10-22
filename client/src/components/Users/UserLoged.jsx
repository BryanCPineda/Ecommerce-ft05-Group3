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
    <DropdownButton id="dropdown-basic-button" title={user.name}>
      
        <Dropdown.Item><Link to="/user/profile">Profile</Link></Dropdown.Item>
      
      <Dropdown.Item href="#/action-2">
        <Logout />
      </Dropdown.Item>
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
