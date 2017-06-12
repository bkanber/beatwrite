
export function addSocketConnection(socket) {
    return {
        type: "ADD_SOCKET_CONNECTION",
        payload: socket
    }
}

export function addSocketEvents(socket){
    return function(dispatch){
        socket.on('update_lyrics', function(data){
            dispatch({type: "UPDATE_SERVER_LYRICS", payload: data})
        })

        socket.on('authenticated', function(data){
            if(data.success){
                dispatch({type: "AUTHENTICATED_SOCKET_FULFILLED", payload: data})
            } else {
                dispatch({type: "AUTHENTICATED_SOCKET_REJECTED", payload: data})
            }
        })

    }
}

export function authenticateSocket(socket, token){
    socket.emit('authenticate', { token })

    return {
        type: "AUTHENTICATE_SOCKET",
        payload: socket
    }

}

