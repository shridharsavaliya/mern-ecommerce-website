const express = require('express')
const { usercontroller } = require('../controller')
const authToken = require('../middleware/authToken')

const router = express.Router()

router.post("/signup",
    usercontroller.create_user
)

router.post("/signin",
    usercontroller.usersignin
)

router.get(
    "/userdetail",
    authToken,
    usercontroller.userDetailController
)

router.get(
    "/logout",
    usercontroller.userLogout
)


// admin panel
router.get(
    "/alluser",
    usercontroller.alluser
)
router.put(
    "/update-user",
    authToken,
    usercontroller.updateUser
)

module.exports = router