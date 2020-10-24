import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
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
import "./UserLoged.css"
import Logout from "./Logout";
//import UserProfile from "./Profile";

//-------------- Redux ------------------------
import { connect } from "react-redux";

const UserLoged = ({ user }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{
          display: "flex",
          position: "relative",
          bottom: "-20px",
          border: "none",
          backgroundColor: "#8a2be2",
          borderRadius: "5px",
        }}
        id="loged-basic"
      >
        {user.name}
      </Dropdown.Toggle>

      <Dropdown.Menu id="dropdown-menu">
        <Dropdown.Item href="#/action-1" id="user-loged-profile">
          <Link to="/user/profile">
            <Button  style={{ border:"none", backgroundColor: "#8a2be2" }}>
              Profile
            </Button>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
            <Logout onClick={() => window.location.reload()}/>
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
