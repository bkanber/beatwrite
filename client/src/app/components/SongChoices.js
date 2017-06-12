import React from "react";
import { Link } from 'react-router-dom'

import { SongChoice } from './SongChoice';


export const SongChoices  = (props) => {
    const songs = props.songs;

    console.log('songs was', songs)

    const mappedSongChoices = songs.map(song =>
    <SongChoice
        songId = { song.id }
        key = { song.id }
        title={ song.title }
    /> )

    return (
        <div>
            { mappedSongChoices }
        </div>
    );
}

//<button onClick = { () => props.getSong(props.songId) }> { props.title } </button>
