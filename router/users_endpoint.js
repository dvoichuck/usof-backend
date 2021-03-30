let express = require('express'),
    router = express.Router(),
    {
        get_all_users,
        found_user,
    } = require('../controler/users'),
    verify = require('../helper/verify')


router.get('/', get_all_users)
router.get('/:user_id', found_user)
router.post('/',  )
// router.post('/avatar', )
module.exports = router;