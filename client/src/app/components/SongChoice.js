import React from "react";
import { Link } from 'react-router-dom'



export const SongChoice  = (props) => {
    return (
        <div>
            <Link to={"/song/" + props.songId }> { props.title }</Link>
        </div>
    );
}

//<button onClick = { () => props.getSong(props.songId) }> { props.title } </button>
