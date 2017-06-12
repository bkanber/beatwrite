import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux"

import { createSong } from "../actions/songActions"
import { resetRedirect, editCreateLink, editCreateTitle, switchToLink, switchToUpload } from "../actions/songCreatorActions"

import CreateSongForm from "../components/CreateSongForm"

import Header from "./Header"
import { Footer }  from "../components/Footer"

import { Redirect } from "react-router"

class CreateSong extends React.Component {


    constructor(){
        super()
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleLinkChange = this.handleLinkChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)

        this.handleSwitchToUpload = this.handleSwitchToUpload.bind(this)
        this.handleSwitchToLink = this.handleSwitchToLink.bind(this)

    }


    handleFormSubmit(){
        // if were uploading our own song, we dont want to use the url that we put.. we want to use the url that was
        // given back from the server that links to the song we uploaded
        this.props.createSong(this.props.songCreator.title, this.props.songCreator.link, this.props.user.token)

    }

    handleLinkChange(event){
        this.props.editCreateLink(event.target.value)
    }

    handleTitleChange(event){
        this.props.editCreateTitle(event.target.value)
    }

    handleSwitchToUpload(event){
        event.preventDefault()
        this.props.switchToUpload()
    }

    handleSwitchToLink(event){
        event.preventDefault()
        this.props.switchToLink()
    }



    componentWillUnmount(){
        this.props.resetRedirect()
    }

    render() {

        if(this.props.song.redirect){
            return(
                <Redirect to= { "/song/" + this.props.song.id } />
            )
        }
        return (
            <div className="container-fluid">
                <Header/>
                <CreateSongForm switchToUpload = {this.handleSwitchToUpload }
                                switchToLink = {this.handleSwitchToLink }
                                isUploading = { this.props.songCreator.uploadingFile }
                                player_src = { this.props.song.player_src }
                                use_iframe = { this.props.song.use_iframe }
                                handleLinkChange = {this.handleLinkChange}
                                handleTitleChange = {this.handleTitleChange}
                                className = "content"
                                onSubmit = { this.handleFormSubmit }/>
            </div>

        );
    }
}

// this tells react which properties of the global state we want to use in this component, and to which local prop attributes we want to access them with.
const mapStateToProps = (state) =>{
    return {
        song: state.song,
        songCreator: state.songCreator,
        user: state.user,
    }
}

// this is where you set the dispatched actions of the component.
const mapDispatchToProps = (dispatch) =>{
    return {
        createSong: (title, url, token, callback) => {
            dispatch(createSong(title, url, token, callback));
        },
        resetRedirect: () => {
            dispatch(resetRedirect());
        },
        editCreateLink:(link) =>{
            dispatch(editCreateLink(link));
        },
        editCreateTitle:(title) =>{
            dispatch(editCreateTitle(title));
        },
        switchToLink:() =>{
            dispatch(switchToLink());
        },
        switchToUpload:() =>{
            dispatch(switchToUpload());
        }

    }
}


// we need to connect the component to the store
// returns a function that we will pass App into it. This returns a "hooked up component" which is exported.
export default connect(mapStateToProps, mapDispatchToProps)(CreateSong)