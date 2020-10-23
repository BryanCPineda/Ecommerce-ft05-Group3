import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const isAdmin = ({ user }) => {
    return (
        <div>
            a
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

export default connect( mapStateToProps, null )(isAdmin)

