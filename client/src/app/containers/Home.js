import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux"

import { submitRegistration } from "../actions/userActions"

import Header from "./Header"
import { Footer }  from "../components/Footer"


import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';


class Home extends React.Component {

    renderHomeScreen(){

        if(!this.props.user.loggedIn){
            return( <div className = "row" style = {{width: "100%"}}>
                    <div className = "container-fluid  col-lg-offset-1 col-xs-offset-2 col-xs-8 col-md-5 col-lg-5">
                        <div className = "row">
                            <h1 style = {{paddingTop: "2vw", lineHeight : "40px", textAlign: "left"}}>
                                Beat Write allows you to easily listen to music while you write lyrics.
                            </h1>

                            <h4 style = {{lineHeight : "40px", textAlign: "left"}}>
                                Enter a Youtube / Soundcloud URL <strong>or</strong> upload an audio file and it will appear over a pad area where you can conviently write and save your lyrics.
                            </h4>
                        </div>

                        <div className = "row">
                            <form className = "form-style-5" style = {{margin: 0, display: "block", background: "none"}}>
                                <LinkContainer to="/login" className = "form-style-5" style = {{marginRight: "25px", display: "inline", paddingRight: 0, paddingLeft: 0, width: "120px", textAlign: "center"}}>
                                    <input type = "submit"  value = "Log In"/>
                                </LinkContainer>

                                <LinkContainer to="/register" className = "form-style-5" style = {{marginRight: "25px", display: "inline", paddingRight: 0, paddingLeft: 0, width: "120px", textAlign: "center"}}>
                                    <input type = "submit"  value = "Register"/>
                                </LinkContainer>

                                <LinkContainer to="/create" className = "form-style-5" style = {{marginRight: "25px", display: "inline", paddingRight: 0, paddingLeft: 0, width: "120px", textAlign: "center"}}>
                                    <input type = "submit"  value = "Create Song"/>
                                </LinkContainer>

                            </form>
                        </div>

                    </div>

                    <div style = {{paddingTop : "2vw"}}className = "container-fluid  col-xs-offset-1 col-xs-10 col-md-5 col-lg-5">
                        <img style = {{width: "100%", boxShadow: "3px 3px 8px 0px #888888"}} src = "../images/example.png"/>
                    </div>


                </div>
            )
        }


        if(this.props.user.loggedIn){
            if(this.props.user.songs.length == 0){
                return(
                    <div className = "row" style = {{width: "100%"}}>
                        <div className = "container-fluid  col-lg-offset-1 col-xs-offset-2 col-xs-8 col-md-5 col-lg-5">
                            <div className = "row">
                                <h1 style = {{paddingTop: "2vw", lineHeight : "40px", textAlign: "left"}}>
                                    You currently don't have any songs. Click the button below to make one.
                                </h1>
                            </div>

                            <div className = "row">
                                <form className = "form-style-5" style = {{margin: 0, display: "block", background: "none"}}>
                                    <LinkContainer to="/create" className = "form-style-5" style = {{marginRight: "25px", display: "inline", paddingRight: 0, paddingLeft: 0, width: "120px", textAlign: "center"}}>
                                        <input type = "submit"  value = "Create Song"/>
                                    </LinkContainer>
                                </form>
                            </div>

                        </div>

                    </div>
                )
            } else {
                const songList = this.props.user.songs.map(song =>
                    <LinkContainer key = {"home_song" + song.id} to = {"/song/" + song.id} style = {{textAlign: "center"}}>
                        <div
                             title={ song.title === '' ? "unnamed song" : song.title } >
                            {song.title === '' ? "unnamed song" : song.title }
                            <hr/>
                        </div>
                    </LinkContainer>)


                return(
                    <div className = "container-fluid col-lg-offset-3 col-xs-offset-0 col-lg-6 col-xs-12">

                        <div className = "row" style = {{boxShadow: "3px 3px 8px 0px #888888", marginTop: "25px", paddingTop: "20px", height: "70vh", overflowY: "auto"}}>
                            {songList}
                        </div>


                        <div className = "row">
                            <LinkContainer to="/create" className = "form-style-5" style = {{ display: "block", margin: "20px, 0 auto", width: "120px", textAlign: "center"}}>
                                <input type = "submit"  value = "New Song"/>
                            </LinkContainer>
                        </div>

                    </div>
                )

            }

        }




    }

    render() {

        return (

            <div className="container-fluid">
                <Header/>

                {this.renderHomeScreen()}


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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)