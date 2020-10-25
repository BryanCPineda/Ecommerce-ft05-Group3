import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/userAction";

import { Button } from "react-bootstrap";

import "./UserLoged.css";

function Logout({ logout }) {
  return (
    <div>

      <span onClick={logout}>
        Logout
      </span>
      
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
