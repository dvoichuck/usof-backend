const User = require('../sequlize').User,
    {
        register,
    } = require('./auth')

async function get_all_users(req, res) {
    const all_users = await User.findAll({attributes: {exclude: ['password', 'email_confirm', 'password_reset']}})
    let arr_user = []
    for (let allUsersKey in all_users) {
        arr_user.push(all_users[allUsersKey].dataValues)
    }
    res.status(200).json({
        users: arr_user,
        count_users: arr_user.length
    })
}

async function found_user(req, res) {
    const user = await User.findOne({attributes: {exclude: ['password', 'email_confirm', 'password_reset']}, where: {id: req.params.user_id}})
    if (user)
        res.status(200).json({
            user: user,
        })
    else
        res.status(404).json({
            user: "user not found",
        })
}

async function create_user(req, res) {
    await register(req, res)
}



module.exports = {
    get_all_users,
    found_user,
    create_user,
}