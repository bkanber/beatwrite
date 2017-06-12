import React from "react";
import {Field, reduxForm} from 'redux-form'

import UploadAudio from "../containers/UploadAudio"

import { LoadingIcon} from "./LoadingIcon"
import { AudioPlayer } from "./AudioPlayer"

const CreateSongForm = props =>{
    const {handleSubmit, pristine, reset, submitting} = props

    const renderVideoOrLoader = function(){

        return props.isUploading ? <LoadingIcon/> : <AudioPlayer className = "col-xs-12 col-md-12 col-lg-12" player_src = {props.player_src}/>

    }


    return (
        <div className="form-style-5 container row col-xs-12 col-md-12 col-lg-12"  style= { { float: "none", margin: "0 auto", marginTop: "10%", boxShadow: "0px 0px 8px 0px #888888"} } >
            <form onSubmit = {handleSubmit}  >
                <div className="container row col-xs-10 col-md-8 col-lg-6"  style= { { float: "none", margin: "0 auto" } } >
                    <div>
                        <div style = {{ paddingTop: "20%"}}>
                            <Field onChange = { props.handleTitleChange } className = "row col-xs-12 col-md-10 col-lg-8"
                                name="title"
                                component="input"
                                type="text"
                                placeholder="Enter Song Title..."
                            />
                        </div>
                    </div>

                    <div>
                        <div style = {{ paddingTop: "20%"}}>


                            <Field onChange = { props.handleLinkChange } className = "row col-xs-12 col-md-10 col-lg-8"
                                   name="url"
                                   component="input"
                                   type="text"
                                   placeholder="Enter Song URL..."
                            />
                            <span style ={{ fontSize: "10px" }}> or... </span>
                            <UploadAudio/>

                            { renderVideoOrLoader() }


                        </div>
                    </div>

                    <div className = "row" style = {{ paddingTop: "20%"}}>
                        <input type="submit" value="Create!" />
                    </div>

                </div>
            </form>

        </div>
    );
}

// decorate the register form
export default reduxForm({
    form: 'create'
})(CreateSongForm)
