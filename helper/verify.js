let jwt = require('jsonwebtoken'),
    config = require('../config/config.json'),
    User = require('../sequlize').User

module.exports = async function verify (req, res, next) {
    const token = req.headers.authorization.replace("Bearer", "").trim();
    req.userid = await jwt.verify(token, config.JWT_SECRET, async (err, payload) => {
        req.payload = payload
    })
    next()
}
