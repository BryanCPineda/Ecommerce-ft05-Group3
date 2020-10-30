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
import { CgProfile } from 'react-icons/cg';
import { getImageOfUser } from '../../actions/userAction';
//import UserProfile from "./Profile";

//-------------- Redux ------------------------
import { connect } from "react-redux";

const UserLoged = ({ user, imageUser, getImageOfUser }) => {

  const userId = user && user.id

  useEffect(() => {
    getImageOfUser(userId);
  }, [])

  return (
    // <Dropdown>
    //   <Dropdown.Toggle id="user-loged-dropdown">{user.name}</Dropdown.Toggle>

    //   <Dropdown.Menu id="user-loged-dropdown-menu">
    //     <Dropdown.Item href="#/action-1" id="user-loged-profile-item">
    //       <Link to="/user/profile">
    //         <Button id="user-loged-profile-button">Profile</Button>
    //       </Link>
    //     </Dropdown.Item>

    //     <Dropdown.Item href="#/action-2" id="user-profile-logout-item">
    //       <Logout onClick={() => window.location.reload()} />
    //     </Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>
    <div className="sign-logout"> 
      <Link to="/user/profile">
      {imageUser ?
        <img className="mr-3" src={imageUser} style={{borderRadius: '100%', heigth: '50px', width: '50px'}}></img>
      :
      <span className="mr-3" style={{color: 'white', fontSize: '28px'}}><CgProfile /></span>
      }
       {user.name === user.lastname ?
      <span className="mr-4 nombre-apellido-profile" style={{color: 'white', fontSize: '22px'}}>{user.name}</span>
      :
      <span className="mr-4 nombre-apellido-profile" style={{color: 'white', fontSize: '22px'}}>{user.name}{" "}{user.lastname}</span>
       }
       </Link>
      <button className="button-logout"><Logout /></button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    imageUser: state.userReducer.imageUser,
    user: state.userReducer.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getImageOfUser: (userId) => dispatch(getImageOfUser(userId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoged);
