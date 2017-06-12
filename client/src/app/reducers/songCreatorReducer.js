const songCreatorReducer = (state =  {
    uploadingFile: false,
    isValidAudio: false,
    completedUpload: false,
    link: '',
    title: '',
    redirect: false,


}, action) => {
    switch(action.type) {
        case "SWITCH_TO_UPLOAD":
            state = {
                ...state,
                uploadFile: action.payload
            };
            break;
        case "SWITCH_TO_LINK":
            state = {
                ...state,
                uploadFile: action.payload
            }
            break
        case "START_UPLOAD":
            state = {
                ...state,
                uploadingFile: true
            }
            break;
        case "START_UPLOAD_FULFILLED":
            state = {
                ...state,
                uploadingFile: false,
                link: action.payload
            }
            break;
        case "UPDATE_CREATE_TITLE":
            state = {
                ...state,
                title: action.payload,
            }
            break;
        case "UPDATE_CREATE_LINK":
            state = {
                ...state,
                link: action.payload,
            }
        case "RESET_REDIRECT":
            state = {
                ...state,
                redirect: false,
                completedUpload: false
            }


    }
    return state;
}



export default songCreatorReducer