const socketReducer = (state =  {
    socket: {},
    token: '',

}, action) => {
    switch(action.type){
        case "ADD_SOCKET_CONNECTION":
            state = {
                ...state,
            };
            state.socket = action.payload

            break;

        case "AUTHENTICATION_FULFILLED":
            state = {
                ...state,
            };
            state.token = action.token

            break;
        case "USER_LOG_OUT":
            state = {
                ...state,
            };
            state.token = ""

            break;


    }
    return state;
}

export default socketReducer