const { getAllUser, register, login } = require("../controller/APIController/userController")
const router = require("express").Router()
const protect = require("../middleware/authHandler.js")


router.get("/all",protect,getAllUser)
router.post("/login",login)
router.post("/register", register)

module.exports = router