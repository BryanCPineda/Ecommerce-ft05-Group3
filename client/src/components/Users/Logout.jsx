import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/userAction";
import { Redirect } from 'react-router-dom';
import "./UserLoged.css";

function Logout({ logout }) {

  const [stateRedirect, setRedirect] = useState({ redirect: null })

  useEffect(() => {
    return () => (
      <Redirect to="/user/catalogo" />
    )
  })

  const handleLogout = () => {
    setRedirect({ redirect: "/user/catalogo" })
    setTimeout(() => {
      localStorage.clear()
      logout();
    }, 0);
  }

  if (stateRedirect.redirect) {
    return <Redirect to={stateRedirect.redirect} />
  }

  return (
    <div>

      <span onClick={handleLogout}>
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
