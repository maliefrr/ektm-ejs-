const router = require("express").Router()
const {login} = require("../controller/webController/userController")


router.get("/",(req,res) => {
    res.render("login",{
        title: "Login",
        layout: "layouts/login-signup",
        err: req.flash("err"),
        msg: req.flash("msg")
    })
})

router.post("/",login)


module.exports = router