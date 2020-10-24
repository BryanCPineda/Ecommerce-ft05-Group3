import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { IoMdTrash, IoMdPhotos, IoIosCart } from "react-icons/io";
import NumberFormat from "react-number-format";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "./UserLoged.css";
//import UserProfile from "./Profile";

//-------------- Redux ------------------------
import { connect } from "react-redux";

const UserLoged = ({ user }) => {
  return (
    <Dropdown>

      <Dropdown.Toggle id="user-loged-dropdown">{user.name}</Dropdown.Toggle>

      <Dropdown.Menu id="user-loged-dropdown-menu">

        <Dropdown.Item href="#/action-1" id="user-loged-profile-item">
          <Link to="/user/profile">
            <Button id="user-loged-profile-button">Profile</Button>
          </Link>
        </Dropdown.Item>
        
        <Dropdown.Item href="#/action-2" id="user-profile-logout-item">
          <Logout onClick={() => window.location.reload()} />
        </Dropdown.Item>

      </Dropdown.Menu>

    </Dropdown>
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
