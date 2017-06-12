import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux"
import { Redirect } from "react-router"

import { submitLogin } from "../actions/userActions"

import LoginForm from "./../components/LoginForm"

import Header from "./Header"
import { Footer }  from "../components/Footer"


import {Field, reduxForm} from 'redux-form'

import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';


class Login extends React.Component {

    render() {

        if(this.props.user.loggedIn){
            return (
                <Redirect to= { "/" } />
            )
        }

        return (

            <div className="container-fluid">
                <Header/>
                <LoginForm onSubmit = { this.props.submitLogin }/>


                <div className = "container-fluid col-xl-offset-3 col-xl-6 col-xs-offset-3 col-xs-6">

                    <div style = {{ margin: "auto", display: "block", width: "180px", marginTop: "30px"}} className = "label label-info">Need an account?</div>

                    <LinkContainer className = "btn btn-success" to="/register" style = {{ margin: "auto", display: "block", marginTop: "30px" }}>
                        <input type = "submit"  value = "Register"/>
                    </LinkContainer>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.user,
        socket: state.socket
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        submitLogin: (values) => {
            dispatch(submitLogin(values));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)