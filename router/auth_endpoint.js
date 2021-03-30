let express = require('express'),
    router = express.Router(),
    {
            register,
            confirm_email,
            login,
            logout,
            passwordReset,
            passwordResetToken,
    } = require('../controler/auth'),
    verify = require('../helper/verify')


router.get('/verify/:confirm_link', confirm_email)
router.post('/register', register)
router.post('/login',  login)
router.post('/logout', verify, logout)
router.post('/password-reset', passwordReset)
router.post('/password-reset/:confirm_token', passwordResetToken)
module.exports = router;