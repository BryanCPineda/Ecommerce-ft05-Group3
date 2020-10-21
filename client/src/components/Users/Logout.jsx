import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';

function Logout({ logout }) {

    return (
        <div>
            <Button className="button" style={{backgroundColor: '#8a2be2'}} onClick={logout}>Logout</Button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logout()),
    };
  };
  
  export default connect(null, mapDispatchToProps)(Logout);
  