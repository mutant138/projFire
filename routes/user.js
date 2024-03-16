const express = require('express')
// const Attendance = require("../models/attendance")
const userController = require("../controllers/user")

const router = express.Router()

router.get("/",userController.signupPage)
router.get("/login",userController.loginPage)
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get("/home" ,userController.homePage)


module.exports = router