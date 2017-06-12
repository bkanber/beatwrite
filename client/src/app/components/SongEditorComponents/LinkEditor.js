import React from "react";

export const LinkEditor = props =>{

    return (
        <div className="container col-xs-12 col-md-12 col-lg-12">
            <form>
            <input type = "text" className="container col-xs-12 col-md-12 col-lg-12" rows = "1" value={ (props.link === null) ? "enter url..." : props.link }
                         onChange={ props.editLink } ></input>
            </form>
        </div>
    );
}
