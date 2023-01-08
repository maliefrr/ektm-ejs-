const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_URI);
        console.log("Database connected")
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

module.exports = connectDB