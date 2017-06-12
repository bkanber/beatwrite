import React from "react";


import {render} from "react-dom";
import {connect} from "react-redux"

import { Field, reduxForm } from 'redux-form'

import { editLyrics, editLink, editTitle, getSong, resetState } from "../actions/songActions"

import { LinkEditor }  from "../components/SongEditorComponents/LinkEditor"
import { TitleEditor }  from "../components/SongEditorComponents/TitleEditor"
import { LyricEditor }  from "../components/SongEditorComponents/LyricEditor"
import { AudioPlayer } from "../components/AudioPlayer"
import { LoadingIcon } from "../components/LoadingIcon"


import UploadAudio from "../containers/UploadAudio"

import { Footer }  from "../components/Footer"


import Header from "./Header"

class SongEditor extends React.Component {


    constructor(props){
        super(props)

        this.handleLinkChange = this.handleLinkChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleLyricChange = this.handleLyricChange.bind(this)

    }

     getSongWhenAuthenticated(){
        var self = this;
        setTimeout(function(){
            if(!self.props.user.triedAuthentication){
                return self.getSongWhenAuthenticated()
            } else {
                return self.props.getSong(self.props.match.params.songId, self.props.user.token)
            }
        }, 100)
     }



    componentWillMount(){
        // we need to get the song if were mounting the component for the first time in case the user just opens right to the link
        // and isnt clicked by anything.

        this.getSongWhenAuthenticated()


        //    this.getSong(this.props)
    }

    componentWillUnmount(){
        this.props.resetState()
    }

    handleLinkChange(event){
        this.props.editLink(event.target.value, this.props.song.id, this.props.socket.socket )
    }


    handleTitleChange(event){
        this.props.editTitle(event.target.value, this.props.song.id, this.props.socket.socket )
    }

    handleLyricChange(event){
        this.props.editLyrics(event.target.value, this.props.song.id, this.props.socket.socket )
    }


    renderEditor(){
        if(!this.props.user.triedAuthentication){
            return(
                <div className="container-fluid" style = {{width: "95%" }}>

                    <div className="content container-fluid col-xs-12 col-md-8 col-lg-8" style = { {paddingTop: "20px", backgroundColor: "#F4F4F4", float: "none", margin: "0 auto",  boxShadow: "0px 0px 8px 0px #888888"}}>

                        <div className = "form-style-5" style = {{boxShadow: "0px 0px 8px 0px #888888"}}>

                            <div className = "row col-xs-12 col-md-11 col-lg-11"  style= { { paddingTop: "20px", paddingBottom: "10px",  float: "none", margin: "0 auto" } }>
                                <LoadingIcon/>
                            </div>

                        </div>
                    </div>
                </div>


            )
        } else {
            return(
                <div className="container-fluid" style = {{width: "95%" }}>

                    <div className="content container-fluid col-xs-12 col-md-8 col-lg-8" style = { {paddingTop: "20px", backgroundColor: "#F4F4F4", float: "none", margin: "0 auto",  boxShadow: "0px 0px 8px 0px #888888"}}>

                        <div className = "form-style-5" style = {{boxShadow: "0px 0px 8px 0px #888888"}}>

                            <div className = "row col-xs-12 col-md-11 col-lg-11"  style= { { paddingTop: "20px", paddingBottom: "10px",  float: "none", margin: "0 auto" } }>

                                <div className = "row">
                                    <label>Change Title:</label>
                                </div>


                                <div className = "row">
                                    <div id ="title-editor">
                                        <TitleEditor title = {this.props.song.title } editTitle = { this.handleTitleChange } />
                                    </div>
                                </div>

                            </div>


                            <div className = "row col-xs-12 col-md-11 col-lg-11"  style= { { paddingBottom: "10px", float: "none", margin: "0 auto" }}>

                                <div className = "row">
                                    <label>Change URL:</label>
                                </div>


                                <div className = "row">
                                    <div id ="link-editor">
                                        <LinkEditor link = {this.props.song.link } editLink = { this.handleLinkChange } />
                                    </div>
                                </div>

                                <div className = "row">
                                    <div style ={{ fontSize: "10px", width: "50%", margin: "0 auto", textAlign: "center" }}> or... </div>
                                </div>

                                <div className = "row">
                                    <UploadAudio/>
                                </div>

                            </div>
                        </div>



                        <div className =  "row" >
                            <div id ="video" style= { { width: "80%", float: "none", margin: "0 auto" } }>
                                <AudioPlayer style= { { float: "none", margin: "0 auto", height: "40vw", width: "100%" } } player_src = {this.props.song.player_src}/>
                            </div>
                        </div>


                        <div className = "row">
                            <LyricEditor lyrics = {this.props.song.client_lyrics } editLyrics = { this.handleLyricChange } />
                        </div>

                    </div>
                </div>

            )
        }
    }

    render() {

        const lyrics = this.props.song.client_lyrics;
        return (
            <div className="container-fluid">

                <Header/>
                { this.renderEditor() }

            </div>

        );
    }
}


// this tells react which properties of the global state we want to use in this component, and to which local prop attributes we want to access them with.
const mapStateToProps = (state) =>{
    return {
        song: state.song,
        user: state.user,
        socket: state.socket
    }
}

// this is where you set the dispatched actions of the component.
const mapDispatchToProps = (dispatch) =>{
    return {
        editLyrics: (lyrics, songId, socket) => {
            dispatch(editLyrics(lyrics, songId, socket));
        },
        editTitle: (title, songId, socket) => {
            dispatch(editTitle(title, songId, socket));
        },
        editLink: (link, songId, socket) => {
            dispatch(editLink(link, songId, socket));
        },
        getSong: (songId, token) => {
            dispatch(getSong(songId, token));
        },
        resetState: () => {
            dispatch(resetState());
        }
    }
}


// we need to connect the component to the store
// returns a function that we will pass App into it. This returns a "hooked up component" which is exported.
export default connect(mapStateToProps, mapDispatchToProps)(SongEditor)