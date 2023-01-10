const { addMahasiswa, getAllMahasiswa } = require("../controller/APIController/mahasiswaController")
const protect = require("../middleware/authHandler")
const router = require("express").Router()

router.get("/all",protect,getAllMahasiswa)
router.post("/add",addMahasiswa)

module.exports = router