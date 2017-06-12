import axios from "axios"

import Config from "Config"
export function createSong(title, url, token) {

    axios.defaults.headers.common['Authorization'] = token

    return function (dispatch) {
        axios.post(Config.serverUrl + '/api/song/create', {
            title,
            link: url

        })
        .then((response) => {
            if(response.data.success){
                dispatch({type: "CREATE_SONG_FULFILLED", payload: response.data.song})
            } else {
                dispatch({type: "CREATE_SONG_REJECTED", payload: response.data})

            }
        })
        .catch((err) => {
            dispatch({type: "CREATE_SONG_REJECTED", payload: err})

        })
    }
}

export function uploadSong(file, token, cb) {

    axios.defaults.headers.common['Authorization'] = token
    return function (dispatch) {
        axios.get(`${Config.serverUrl} + '/api/song/upload?file_type=${file.type}`)
            .then((response) => {
                if(response.data.success){
                    dispatch({type: "SIGNED_REQUEST_FULFILLED", payload: response.data.signed_request})
                    dispatch({type: "START_UPLOAD", payload: true})

                    uploadToS3(file, response.data.signed_request, response.data.url, function(result){
                        if(result.success){

                            dispatch({type: "START_UPLOAD_FULFILLED", payload: result.url})
                            cb(result.url)


                        } else {
                            dispatch({type: "START_UPLOAD_REJECTED", payload: "Could not upload"})
                            cb(null)

                        }

                    })

                } else {
                    dispatch({type: "SIGNED_REQUEST_REJECTED", payload: response.data.signed_request})
                    cb(null)


                }
            })
            .catch((err) => {
                dispatch({type: "SIGNED_REQUEST_REJECTED", payload: ''})
                cb(null)

            })
    }
}

function uploadToS3(file, signedRequest, url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                callback({
                    success: true,
                    url: url
                })
            }
            else{
                callback({
                    success: false,
                })
            }
        }
    };
    xhr.send(file);
}


export function resetState(){
    return({
        type: "RESET_SONG_STATE",
        payload: false
    })
}

export function getSong(songId, token) {

    axios.defaults.headers.common['Authorization'] = token

    return function (dispatch) {

        axios.get(Config.serverUrl + '/api/song/'+songId)
            .then((response) => {
                if(response.data.success){

                    getEmbeddedSrcFromLink(response.data.song.link, function (src) {
                        dispatch({
                            type: "GET_SONG_FULFILLED",
                            payload: {
                                song: response.data.song,
                                src,
                            }
                        })
                    })

                } else {
                    dispatch({type: "GET_SONG_REJECTED", payload: response.data})
                }

            })
            .catch((err) => {
                dispatch({type: "GET_SONG_REJECTED", payload: err})
            })
    }
}


/*
 @param lyrics - the new updated lyrics
 @param songId - the id of the updated song
 @param socket - the socket connection used to notify the server
 */
export function editLyrics(lyrics, songId, socket){

    socket.emit('edit', { songId, newLyrics: lyrics })
    return {
        type: "UPDATE_CLIENT_LYRICS",
        payload: {
            lyrics: lyrics,
            id: songId
        }
    }
}


/*
 @param lyrics - the new updated lyrics
 @param socket - the socket connection used to notify the server
 */
export function editTitle(title, songId, socket){

    socket.emit('edit_title', { songId, newTitle: title })
    return {
        type: "UPDATE_TITLE",
        payload:{
            title: title,
            id: songId,
        }
    }
}


/*
 @param lyrics - the new updated lyrics
 @param socket - the socket connection used to notify the server
 */
export function editLink(link, songId, socket){

    socket.emit('edit_link', { songId, newLink: link })

    return function (dispatch) {

        dispatch({
            type: "UPDATE_LINK",
            payload:{
                link: link,
                id: songId,
            }
        })

        getEmbeddedSrcFromLink(link, function (src) {
            dispatch({
                type: "UPDATE_SRC_FOR_PLAYER",
                payload: src
            })
        })
    }
}




function youtubeParser(url){
    try{
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    } catch ( e ){
        return null;
    }
}


function soundcloudParser(url, cb){
    SC.oEmbed(url, { auto_play: false, show_comments: false }).then(function(oEmbed) {
        if(oEmbed){
            let iframe = oEmbed.html

            // since it returns the iframe html.. we dont want to use that since that logic is done in our application, we just
            // want to extract the src.
            let res = iframe.match(/\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/i,) // match src='a' OR src="a" OR src=a
            let src = res[1]||res[2]||res[3]; // get the one that matched

            return(cb({
                success: true,
                src
            }))
        } else {
            return(cb({
                success: false,
            }))
        }
    }).catch(err =>{
        return(cb({
            success: false,
            err
        }))
    });
}

function getEmbeddedSrcFromLink(url, cb){

    if(isURL(url)){
        let youtubeCode = youtubeParser(url)
        if(youtubeCode){
            return cb("https://www.youtube.com/embed/" + youtubeCode + "?playsinline=1")
        } else {
            soundcloudParser(url, function(res){
                if(res.success){
                    return cb(res.src);
                } else {
                    return cb(url)
                }
            })
        }
    } else {
        return cb(null)
    }


}


// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function isURL(str) {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex .test(str)) {
        return false;
    } else {
        return true;
    }
}