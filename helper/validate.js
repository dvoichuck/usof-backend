let validate = function (email, login, full_name, password) {
    let validate = {}
    validate['email'] = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
    validate['login'] = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i.test(String(login).toLowerCase());
    validate['full_name'] = /^[a-zа-я ]+$/gi.test(String(full_name).toLowerCase());
    if(password)
        validate['password'] = password.length >= 6 ? true : false;
    if (!validate.login)
        return "invalid login"
    if (!validate.password)
        return "password must be more than 6 characters"
    if (!validate.full_name)
        return "full_name use only Latin or Cyrillic"
    if (!validate.email)
        return "invalid email"
    console.log(validate)
    return validate
}
module.exports =  validate
