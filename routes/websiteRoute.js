const router = require("express").Router()

router.get("/",(req,res) => {
    res.render("login",{
        title: "Login",
        layout: "layouts/login-signup"
    })
})


module.exports = router