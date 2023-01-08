const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const protect = asyncHandler(async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.SECRET);

            // Get User from token
            req.user = await userModel.findById(decoded.id).select("-password");
            next()
        } catch (error) {
            console.error(error);
            res.status(401).json({
                statusCode: 401,
                message: "Not Authorized"
            })
        }
    }
    if(!token){
        res.status(401).json({
            statusCode: 401,
            message: "Not Authorized, no token"
        })
    }
})

module.exports = protect;