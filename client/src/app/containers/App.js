import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux"

import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import CreateSong from "./CreateSong"
import SongEditor from "./SongEditor"
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"



import io from "socket.io-client"

import { addSocketConnection, addSocketEvents } from "../actions/socketActions"

import { checkAndAuthenticateToken } from "../actions/userActions"

class App extends React.Component {

    componentWillMount(){
        const socket = io();
        this.props.addSocketConnection(socket)
        this.props.addSocketEvents(socket)
        this.props.checkAndAuthenticateToken()


        // init our soundcloud api
        SC.initialize({
            client_id: 'DS1X2cpCyqkt3txYCumIM729hLbu7KNl'
        });
    }

    render() {

        const loggedIn = this.props.state.user.loggedIn

        return (
            <div className="container-fluid">
                <Router>
                    <div>
                        <Route exact = {true} path={"/" } component = {Home}/>
                        <Route exact = {true} path={"/login"} component = {Login}/>
                        <Route exact = {true} path={"/register"} component ={Register}/>
                        <Route exact = {true} path={"/song/:songId"} component={SongEditor}/>
                        <Route exact = {true} path={"/create"} component={CreateSong}/>

                    </div>
                </Router>

            </div>
        );
    }

}


// this tells react which properties of the global state we want to use in this component, and to which local prop attributes we want to access them with.
const mapStateToProps = (state) =>{
    return {
        state
    }
}

// this is where you set the dispatched actions of the component.
const mapDispatchToProps = (dispatch) =>{
    return {
        addSocketConnection: (socket) => {
            dispatch(addSocketConnection(socket));
        },
        addSocketEvents: (socket) => {
            dispatch(addSocketEvents(socket));
        },
        checkAndAuthenticateToken: () => {
            dispatch(checkAndAuthenticateToken());
        }
    }
}


// we need to connect the component to the store
// returns a function that we will pass App into it. This returns a "hooked up component" which is exported.
export default connect(mapStateToProps, mapDispatchToProps)(App)

