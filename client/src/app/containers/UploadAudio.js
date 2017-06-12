import React from "react";
import {render} from "react-dom";
import {connect} from "react-redux"

import { uploadSong, editLink } from "../actions/songActions"

class UploadAudio extends React.Component {

    constructor(props){
        super(props)
        this.onChoseFile = this.onChoseFile.bind(this)
    }

    onChoseFile(){
        let file = document.getElementById('audiofile').files[0]
        let self = this;

        this.props.uploadSong(file, this.props.user.token, function(link){
            if(self.props.song.isEditing){
                self.props.editLink(link, self.props.song.id, self.props.socket.socket)
            }
        })

    }

    render() {

        return (
                <label className ="custom-file-upload" style = {{boxShadow: "0px 0px 8px 0px #888888", marginTop: "15px"}}>
                    <input type="file" id = "audiofile" onChange = { this.onChoseFile } />
                    <i className="glyphicon glyphicon-upload"></i> Choose File <span style = {{ "fontSize": "12px" }}>(mp3/wav/m4a)</span>
                </label>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.user,
        socket: state.socket,
        song: state.song
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        uploadSong: (fileType, token, cb) => {
            dispatch(uploadSong(fileType, token, cb));
        },
        editLink: (link, songId, socket) => {
            dispatch(editLink(link, songId, socket));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAudio)