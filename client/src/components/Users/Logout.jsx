import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/userAction";

import { Button } from "react-bootstrap";

import "./UserLoged.css";

function Logout({ logout }) {
  return (
    <div>

      <Button id="user-logout-button" onClick={logout}>
        Logout
      </Button>
      
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
