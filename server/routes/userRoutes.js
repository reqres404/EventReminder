const express = require('express')
const router = express.Router()
const {getUser, login, register,getUserRole} = require('../controllers/userController')

router.get("",getUser)
router.post("/login",login)
router.post("/register",register)
router.get("/:id",getUserRole)


module.exports=router