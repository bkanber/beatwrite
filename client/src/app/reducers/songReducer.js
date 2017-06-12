const songReducer = (state =  {
    name: '',
    client_lyrics: '',
    server_lyrics: '',
    title: '',
    link: '',
    player_src: '',
    songId: '',
    id: '',
    isEditing: false,
    gettingSong: false,

}, action) => {
    switch(action.type){
        case "CREATE_SONG_FULFILLED":
            state = {
                ...state,
                title: action.payload.title,
                link: action.payload.songUrl,
                id: action.payload.id,
                redirect: true,
                player_src: action.payload.src
            };

            break;
        case "CREATE_SONG_REJECTED":
            state = {
                ...state,
            };
            break;
        case "UPDATE_SERVER_LYRICS":
            state = {
                ...state,
                server_lyrics: action.payload
            }
            break;
        case "UPDATE_CLIENT_LYRICS":
            state = {
                ...state,
                client_lyrics: action.payload.lyrics
            }
            break;

        case "GET_SONG_STARTED":
            state = {
                ...state,
                gettingSong: true,
            }
            break;

        case "GET_SONG_FULFILLED":
            state = {
                ...state,
                server_lyrics: action.payload.song.lyrics,
                client_lyrics: action.payload.song.lyrics,
                title: action.payload.song.title,
                link: action.payload.song.link,
                id: action.payload.song.id,
                isEditing: true,
                player_src: action.payload.src,
                gettingSong: false,
            }
            break;
        case "GET_SONG_REJECTED":
            state = {
                gettingSong: false,
            }
            break;

        case "START_UPLOAD_FULFILLED":
            state = {
                ...state,
                link: action.payload,
                player_src: action.payload
            }
            break;

        case "UPDATE_TITLE":
            state = {
                ...state,
                title: action.payload.title,
            }
            break;
        case "UPDATE_LINK":
            state = {
                ...state,
                link: action.payload.link,
            }

            break;
        case "UPDATE_SRC_FOR_PLAYER":
            state = {
                ...state,
                player_src: action.payload
            }

            break;

        case "RESET_SONG_STATE":
            state = {
                ...state,
                name: '',
                client_lyrics: '',
                server_lyrics: '',
                title: '',
                link: '',
                player_src: '',
                songId: '',
                id: '',
                isEditing: false,
            }

    }
    return state;
}


export default songReducer