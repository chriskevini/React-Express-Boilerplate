const mongoose = require("mongoose");

let connectionString =
    process.env.DB_CONNECTION ||
    "mongodb+srv://user1:passpasswordword@cluster0.zs59p.mongodb.net/Tutor-Helper?retryWrites=true&w=majority";
mongoose.connect(connectionString);

module.exports = mongoose.connection;