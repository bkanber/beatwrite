


export function editCreateLink(link){
    return function(dispatch){
        dispatch({
            type: "UPDATE_CREATE_LINK",
            payload: link
        })

        getEmbeddedSrcFromLink(link, function (src) {
            dispatch({
                type: "UPDATE_SRC_FOR_PLAYER",
                payload: src
            })
        })

    }




}

export function editCreateTitle(title){
    return({
        type: "UPDATE_CREATE_TITLE",
        payload: title
    })
}


export function switchToLink(){
    return({
        type: "SWITCH_TO_LINK",
        payload: false
    })
}


export function switchToUpload(){
    return {
        type: "SWITCH_TO_UPLOAD",
        payload: true
    }
}


export function resetRedirect(){
    return {
        type: "RESET_REDIRECT",
        payload: false
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
            return cb("https://www.youtube.com/embed/" + youtubeCode)
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