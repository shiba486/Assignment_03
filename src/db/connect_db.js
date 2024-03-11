const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
// const URI = "mongodb://localhost:27017/todo_database";


const database_connection = async function(){
    try {
        const DB_Instance = await mongoose.connect(URI);
        console.log(`database connection successfull at DB host: ${DB_Instance.connection.host} `)
    } catch (error) {
        console.log(`database connection failed`);
        process.exit(1)
    }
}

module.exports = database_connection;