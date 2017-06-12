// store.js holds the store

import { createStore, combineReducers, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import song from "./reducers/songReducer"
import user from "./reducers/userReducer"
import socket from "./reducers/socketReducer"
import songCreator from "./reducers/songCreatorReducer"

import { reducer as form } from 'redux-form'
import Config from "Config"


const socketAuthenticator = (store) => (next) => (action) =>{
    if(action.type === "AUTHENTICATION_FULFILLED" || action.type === "REGISTRATION_FULFILLED") {
        let token = action.payload.token;
        let socket = store.getState().socket.socket
        socket.emit('authenticate', { token })
    }
    next(action)
}

let store;
if(!Config.isProduction){
    store = createStore(combineReducers({ song, user, socket, songCreator, form }),
            {},
            applyMiddleware(createLogger(), thunk, promise(), socketAuthenticator))
} else {
    store = createStore(combineReducers({ song, user, socket, songCreator, form }),
        {},
        applyMiddleware(thunk, promise(), socketAuthenticator))
}


export default store