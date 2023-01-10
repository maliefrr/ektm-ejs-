const router = require("express").Router()
const {login} = require("../controller/webController/userController")


router.get("/",(req,res) => {
    res.render("login",{
        title: "Login",
        layout: "layouts/login-signup"
    })
})

router.post("/",(req,res) => {
    console.log(req.body)
    res.redirect("/")
})


module.exports = router