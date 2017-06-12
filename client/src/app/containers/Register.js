import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux"
import { Redirect } from "react-router"

import { submitRegistration } from "../actions/userActions"

import RegisterForm from "./../components/RegisterForm"

import Header from "./Header"
import { Footer }  from "../components/Footer"


import {Field, reduxForm} from 'redux-form'

import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';


class Register extends React.Component {

    render() {


        if(this.props.user.loggedIn){
            return (
                <Redirect to= { "/" } />
            )
        }

        return (

            <div className="container-fluid">
                <Header/>
                <RegisterForm className = "content" onSubmit = { this.props.submitRegistration }/>

                <div className = "container-fluid col-xl-offset-3 col-xl-6 col-xs-offset-3 col-xs-6">

                    <div style = {{ margin: "auto", display: "block", width: "180px", marginTop: "30px"}} className = "label label-info">Already have an account?</div>

                    <LinkContainer className = "btn btn-success" to="/login" style = {{ margin: "auto", display: "block", marginTop: "30px" }}>
                        <input type = "submit"  value = "Log In"/>
                    </LinkContainer>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.user,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        submitRegistration: (values) => {
            dispatch(submitRegistration(values));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)