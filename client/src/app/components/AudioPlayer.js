import React from "react";
import ReactAudioPlayer from 'react-audio-player';

export const AudioPlayer  = (props) => {

    if(!props.player_src) return <div></div>;

    if(props.player_src.includes('soundcloud.com') || props.player_src.includes('youtube.com') || props.player_src.includes('youtu.be')){
        return(
            <iframe id = "videoplayer"
                    style = {props.style} type="text/html"
                    src= {  props.player_src }
                    className = {props.className }
                    fs="0">
            </iframe>
        )
    } else {
        return(
            <ReactAudioPlayer style= {{...props.style, height: "35px" }}
                              src= { props.player_src }
                              className = {props.className}
                              controls
            />
        )
    }
}



