import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/userAction";

function Logout({ logout }) {
  return (
    <div>
      <Button
        onClick={logout}
        style={{ border:"none", backgroundColor: "#8a2be2" }}
      >
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
