import React from "react";
import {Field, reduxForm} from 'redux-form'


const RegisterForm = props =>{
    const {handleSubmit, pristine, reset, submitting} = props

    return (
        <div className="form-style-5 container row col-xs-12 col-md-12 col-lg-12"  style= { { float: "none", margin: "0 auto", marginTop: "100px", boxShadow: "0px 0px 8px 0px #888888"} } >
            <form onSubmit = { handleSubmit }>
                <div className="container row col-xs-6 col-md-6 col-lg-6"  style= { { float: "none", margin: "0 auto" } } >
                    <div style = {{ paddingTop: "20%"}}>
                        <Field className = "row col-xs-12 col-md-10 col-lg-8"
                            name="username"
                            component="input"
                            type="text"
                            placeholder="username"
                        />
                    </div>

                    <div style = {{ paddingTop: "20%"}}>
                        <Field className = "row col-xs-12 col-md-10 col-lg-8"
                            name="password"
                            component="input"
                            type="text"
                            placeholder="password"
                        />
                    </div>

                    <div style = {{ paddingTop: "20%"}}>
                        <Field className = "row col-xs-12 col-md-10 col-lg-8"
                            name="password2"
                            component="input"
                            type="text"
                            placeholder="confirm password"
                        />
                    </div>

                    <div style = {{ paddingTop: "20%"}}>
                        <Field className = "row col-xs-12 col-md-10 col-lg-8"
                            name="email"
                            component="input"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div className = "row" style = {{ paddingTop: "20%"}}>
                        <input type="submit" value="Register" />
                    </div>
                </div>
            </form>
        </div>
    );
}


// decorate the register form
export default reduxForm({
    form: 'register'
})(RegisterForm)
