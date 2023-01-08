const asyncHandler = require("express-async-handler");
const { mahasiswaModel } = require("../models/mahasiswaModel");
const bcrypt = require("bcryptjs");
const uploader = require("imgbb-uploader")
const userModel = require("../models/userModel");


const getAllMahasiswa = asyncHandler(async (req,res) => {
    const authorizeUser = req.user.id;
    const user = await userModel.findById(authorizeUser)
    if(authorizeUser && user.role !== "admin") {
        res.status(401).json({
            statusCode: 401,
            message: "User not authorized"
        })
    } else {
        const data = await mahasiswaModel.find()
        res.status(200).json({
            statusCode: 200,
            data : data.map(user => {
                return {
                    name : user.name,
                    nim : user.nim,
                    prodi : user.prodi,
                    alamat : user.alamat,
                    gol_darah : user.gol_darah,
                    pas_foto : user.pas_foto,
                    jenis_kelamin : user.jenis_kelamin
                }
            })
        })
    }
})

const addMahasiswa = asyncHandler( async (req,res) => {
    const {name,prodi,nim,alamat,gol_darah,jenis_kelamin} = req.body;
    
    if(!name || !prodi || !nim || !alamat) {
        res.status(400).json({
            statusCode: 400,
            message: "The field cannot be blank"
        })
    }
    else {
        const salt = await bcrypt.genSalt(10);
        const filePath = req.file.path
        if(!filePath){
            const imageUpload = await uploader(process.env.IMG_API, filePath)
            const data = await mahasiswaModel.create({
                name,prodi,alamat,pas_foto : imageUpload.image.url , nim,
                gol_darah : gol_darah ? gol_darah : "-",
                jenis_kelamin: jenis_kelamin ? jenis_kelamin : "-"
            })
            data.save()
        } else {
            const data = await mahasiswaModel.create({
                name,prodi,alamat,pas_foto : imageUpload.image.url , nim,
                gol_darah : gol_darah ? gol_darah : "-",
                jenis_kelamin: jenis_kelamin ? jenis_kelamin : "-"
            })
            data.save()
        }
        const createdUser = await userModel.create({
            username: data.nim,
            email: `${nim}@uho.ac.id`,
            password: await bcrypt.hash(nim,salt),
            role: "mahasiswa",
            name
        })
        createdUser.save()
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data
        })
    }
})


module.exports = {
    addMahasiswa, getAllMahasiswa
}