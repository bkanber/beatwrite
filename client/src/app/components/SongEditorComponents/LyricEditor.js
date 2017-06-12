import React from "react";

export const LyricEditor = props =>{

    return (
        <div className="container col-xs-12 col-md-12 col-lg-12">

                <textarea className="container col-lg-offset-1 col-md-offset-1 col-sm-offset-0 col-xs-offset-0 col-xs-12 col-sm-12 col-md-10 col-lg-10" rows = "25" value={ (props.lyrics === null) ? "enter text..." : props.lyrics }
                      onChange={ props.editLyrics } ></textarea>

        </div>
    );
}
