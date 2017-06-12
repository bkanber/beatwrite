

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateNotEmpty(key){
    if(key === '' || key === undefined || key === null){
        return false;
    }
    return true
}

function validateUsernameLength(username){
    if(username.length >= 3 && username.length < 25){
        return true;
    }
    return false;
}

function validateUsernameNoWhiteSpace(username){
    return !username.indexOf(' ') >= 0;
}

function validatePasswords(password1, password2){
    return (password1 === password2)
}

module.exports = function validateRegistrationInfo(params){

    for(var key in params){
        if(!validateNotEmpty(params[key])){
            return {
                success: false,
                error: "Please don't leave any empty fields."
            }
        }
    }

    if(!validateEmail(params['email'])){
        return {
            success: false,
            error: "Please enter valid email."
        }
    }

    if(!validateUsernameLength(params['username'])){
        return {
            success: false,
            error: "Please enter a username at least 3 characters."
        }
    }

    if(!validateUsernameNoWhiteSpace(params['username'])){
        return {
            success: false,
            error: "Please enter a username with no spaces."
        }
    }

    if(!validatePasswords(params['password'], params['password2'])){
        return {
            success: false,
            error: "Please make sure your passwords match"
        }
    }

    return {
        success: true
    }

}
