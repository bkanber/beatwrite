import axios from "axios"
import Config from "Config"

export function checkAndAuthenticateToken(){
    return function (dispatch){

        const token = localStorage.getItem('jwtToken')


        if(!token || token === '') return

        axios.defaults.headers.common['Authorization'] = token

        axios.post(Config.serverUrl + '/api/user/authenticateToken', {})
            .then((response) => {
                if(response.data.success){

                    dispatch({

                        type: "AUTHENTICATION_FULFILLED",

                        payload: {
                            username: response.data.username,
                            token,
                            songs: response.data.songs,
                        }
                    })
                } else {
                    dispatch({type: "AUTHENTICATION_FULFILLED", payload: response.data})
                }
            })
            .catch((err) => {
                dispatch({type: "AUTHENTICATION_FULFILLED", payload: err})
            })

    }
}


export function submitLogin(values) {

    return function (dispatch) {
        axios.post(Config.serverUrl + '/api/user/login', {
            username: values.username,
            password: values.password
        })
        .then((response) => {
            if(response.data.success){

                localStorage.setItem('jwtToken', response.data.token)

                dispatch({

                    type: "AUTHENTICATION_FULFILLED",

                    payload: {
                        username: response.data.user.username,
                        token: response.data.token,
                        songs: response.data.songs
                    }
                })
            } else {
                dispatch({type: "AUTHENTICATION_REJECTED", payload: response.data})
            }
        })
        .catch((err) => {
            dispatch({type: "AUTHENTICATION_REJECTED", payload: err})
        })

    }
}

export function submitRegistration(values) {

    return function (dispatch) {
        axios.post(Config.serverUrl + '/api/user/register', {
            username: values.username,
            email: values.email,
            password: values.password,
            password2: values.password2
        })
        .then((response) => {
            if(response.data.success){
                dispatch({

                    type: "REGISTRATION_FULFILLED",

                    payload: {
                        username: response.data.user.username,
                        token: response.data.token
                    }
                })
            } else {
                dispatch({type: "REGISTRATION_REJECTED", payload: response.data})
            }
        })
        .catch((err) => {
            dispatch({type: "REGISTRATION_REJECTED", payload: err})
        })

    }
}

export function logOut(socket){

    localStorage.setItem('jwtToken', '')
    socket.emit('logout')
    return({
        type: "USER_LOG_OUT",
        payload: ""
    })
}