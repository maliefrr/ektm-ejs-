const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const axios = require("axios")
const asyncHandler = require("express-async-handler")
const userModel = require("../../models/userModel.js")

const getAllUser = asyncHandler( async (req,res) => {
    const authorizeUser = req.user.id;
    const user = await userModel.findById(authorizeUser)
    const data = await userModel.find()
    if(authorizeUser && user.role === "admin") {
        res.status(200).json({
            statusCode: 200,
            message: "Succes",
            data: data.map(user => {
                return {
                    username : user.username,
                    email: user.email,
                    role: user.role
                }
            })
        })
    }
    res.status(401).json({
        statusCode: 401,
        message: "User not authorized"
    })
})

const register = asyncHandler( async (req,res) => {
    const {name,username,email,password} = req.body;

    if(!name || !username || !email || !password) {
        res.status(400).json({
            statusCode: 400,
            message: "The field cannot be blank"
        })
    } else {
        const user = await userModel.findOne({username});
        if(user){
            res.status(400).json({
                statusCode:400,
                message: "Username has been already exist"
            })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password,salt)
            const data = await userModel.create({
                username,email,password : hash
                ,name,role : "admin"
            })
            data.save()
            res.status(201).json({
                statusCode: 201,
                message: "User has been successfully registered",
                data: {
                    id: data.id,
                    token: getToken(data.id)
                }
            })
        }
    }
})

const login = asyncHandler( async (req,res) => {
    const {username,password} = req.body;
    console.log(!username)
    if(!username || !password){
        req.flash("err","The field cannot be blank")
        res.redirect("/")
    }else {
        const response = await axios.post("http://localhost:5000/api/users/login",{
            username,password
        })
        console.log(response)
        res.redirect("/");
    }
    
    }
)

const getToken = (id) => {
    return jwt.sign({id},process.env.SECRET,{
        expiresIn: "1d"
    })
}

module.exports = {
    getAllUser,register,login
}