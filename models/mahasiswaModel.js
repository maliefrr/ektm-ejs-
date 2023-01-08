const mongoose = require("mongoose")

const mahasiswaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nim: {
        type: String,
        required: true,
        unique: true
    },
    prodi: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    gol_darah: {
        type: String,
        default: "-"
    },
    pas_foto: {
        type: String,
        required: true
    },
    jenis_kelamin: {
        type: String,
        default: "-"
    }
},{
    timestamps: true
})

const mahasiswaModel = mongoose.model("Mahasiswa",mahasiswaSchema)

module.exports = {mahasiswaModel}