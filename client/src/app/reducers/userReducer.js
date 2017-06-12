const userReducer = (state =  {
    loggedIn: false,
    token: '',
    username: '',
    songs: [],
    triedAuthentication: false,
}, action) => {



    switch(action.type){
        case "REGISTRATION_FULFILLED":
            state = {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                loggedIn: true
            };
            //  state.songs = action.payload.songs.slice()

            break;

        case "AUTHENTICATION_FULFILLED":
            console.log('the action was', action)
            state = {
                ...state,
                token: action.payload.token,
                username: action.payload.username,
                loggedIn: true,
                triedAuthentication: true
            };
            state.songs = action.payload.songs.slice()

            break;
        case "AUTHENTICATION_REJECTED":
            console.log('the action was', action)
            state = {
                ...state,

                triedAuthentication: true
            };
            break;

        case "USER_LOG_OUT":
            state = {
                ...state,
                loggedIn: false,
                token: '',
                username: '',
                songs: []
            }
            break;

        case "UPDATE_CLIENT_LYRICS":
            state = {
                ...state,
                client_lyrics: action.payload.lyrics
            }
            break;

        case "UPDATE_TITLE":
            state = {
                ...state,
                title: action.payload.title,
            }
            state.songs = updateSongList(state.songs, "title", action.payload.title, action.payload.id)
            break;
        case "UPDATE_LINK":
            state = {
                ...state,
                link: action.payload.link,
            }
            state.songs = updateSongList(state.songs, "link", action.payload.link, action.payload.id)
            break;

    }
    return state;
}

function updateSongList(songs, attribute, newValue, id){
    for(let i = 0; i < songs.length; i++){
        if(songs[i].id === id){
            songs[i][attribute] = newValue
        }
    }
    return songs.slice();

}


export default userReducer
