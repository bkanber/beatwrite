import React from "react";
import {Field, reduxForm} from 'redux-form'

export const TitleEditor = props =>{

    return (
        <div className="container col-xs-12 col-md-12 col-lg-12">
            <form>
            <input type ="text" className="container col-xs-12 col-md-12 col-lg-12" rows = "1" value={ (props.title === null) ? "enter text..." : props.title }
                         onChange={ props.editTitle } ></input>
            </form>
        </div>
    );
}
