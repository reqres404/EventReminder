const express = require('express')
const router = express.Router()
const {getUser, login, register} = require('../controllers/userController')

router.get("",getUser)
router.post("/login",login)
router.post("/register",register)

module.exports=router