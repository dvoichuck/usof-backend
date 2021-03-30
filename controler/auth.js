let bcrypt = require('bcrypt'),
    config = require('../config/config.json'),
    sendMessage = require('../helper/confirm_email'),
    passwordSend = require('../helper/password_reset_email'),
    validate = require('../helper/validate'),
    jwt = require('jsonwebtoken')
const User = require('../sequlize').User

async function logout (req, res) {
    if (req.payload)
        res.status(200).json({
        logout: true,
        message: "logout Done"
        })
    else
        res.status(200).json({
            logout: true,
            message: "logout incorrect"
        })
}

async function  create_user(req, res) {
    let passwordFromUser = req.body.password;
    let salt = bcrypt.genSaltSync(Number(config.salt));
    let email_confirm = Math.random().toString(36).substring(7);
    let link = "http://" + req.get('host') + "/api/auth/verify/" + email_confirm;

    await User.create({
        login: req.body.login,
        password: bcrypt.hashSync(passwordFromUser, salt),
        full_name: req.body.full_name,
        email: req.body.email,
        email_confirm: email_confirm,
    })

    await sendMessage(req.body.email, req.body.login, link)
    res.status(200).json({
        register: true,
        message: "Done"
    })
}


async function register (req, res) {
    console.log(req.body)
    let validate_obj = validate(req.body.email, req.body.login, req.body.full_name, req.body.password)
    if (validate_obj.email && validate_obj.login && validate_obj.full_name && validate_obj.password) {
        console.log("validation confirm")

        let userLogin = await User.findOne({where: {login: req.body.login}})
        if (userLogin) {
            return res.status(400).json({
                register: false,
                message: "login is already taken"
            })
        }
        let userEmail = await User.findOne({where: {email: req.body.email}})
        if (userEmail) {
            return res.status(400).json({
                register: false,
                message: "email is already taken"
            })
        }
        await create_user(req, res)
    }
    else {
        res.status(400).json({
            register: false,
            message: validate_obj
        })
    }
}

async function confirm_email(req, res) {
    if (req.params.confirm_link != 1) {
        console.log("confirm_link: " + req.params.confirm_link)
        let user = await User.findOne({where: {email_confirm: req.params.confirm_link}})
        if (user) {
            await User.update(
                {email_confirm: true},
                {where: {id: user.id}})
            res.status(200).json({
                confirm_email: true,
                message: "Your email confirm"
            })
        } else {
            res.status(400).json({
                confirm_email: false,
                message: "This link does not exist"
            })
        }
    }
}

async function login (req, res) {
    let user = await User.findOne({where: {login: req.body.login}})
    if (user === null)
        return res.status(400).json({
            login: false,
            message: "user does not exist"
        })
    if (user.login === req.body.login && user.email === req.body.email && bcrypt.compareSync(req.body.password, user.password)) {
        console.log(user.email_confirm)
        if (user.email_confirm === '1') {
            console.log(user.id)
            const payload = { id: user.id };
            const token = jwt.sign(payload, config.JWT_SECRET, {
                expiresIn: config.JWT_EXPIRE,
            });

            res.status(200).json({ success: true, data: token });
        }
        else {
            return res.status(400).json({
                login: false,
                message: "Confirm your email, pls"
            })
        }
    }
    else {
        return res.status(400).json({
            login: false,
            message: "wrong email or password"
        })
    }
}

async function passwordReset(req, res) {
    console.log(req.body.email)
    let user = await User.findOne({where: {email: req.body.email}})
    if (user) {
        if (user.email_confirm === '1') {
            let password_confirm = Math.random().toString(36).substring(7);
            let link = "http://"+req.get('host')+"/api/auth/password-reset/" + password_confirm;
            await User.update(
                {password_reset: password_confirm},
                {where: {id: user.id}})
            passwordSend(user.email, user.login, link)
            return res.status(200).json({
                passwordReset: true,
                message: "link for reset-password in your email"
            })
        }
        else {
            return res.status(400).json({
                passwordReset: false,
                message: "Confirm your email"
            })
        }
    }
    else {
        return res.status(400).json({
            passwordReset: false,
            message: "Email does not exist"
        })
    }
}

async function passwordResetToken(req, res) {
    console.log(req.params.confirm_token)
    let user = await User.findOne({where: {password_reset: req.params.confirm_token}})
    if (user) {
        let passwordFromUser = req.body.password;
        let salt = bcrypt.genSaltSync(Number(config.salt));
        await User.update(
            {password: bcrypt.hashSync(passwordFromUser, salt)},
            {where: {password_reset: req.params.confirm_token}})
        await User.update(
            {password_reset: null},
            {where: {password_reset: req.params.confirm_token}})

    }
    else {
        return res.status(400).json({
            passwordReset: false,
            message: "Link does not exist"
        })
    }
}


module.exports = {
    register,
    confirm_email,
    login,
    logout,
    passwordReset,
    passwordResetToken,
}
