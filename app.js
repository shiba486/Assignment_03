//BASIC LIBRARY IMPORT
const  express = require("express");
const app = express();
const router = require("./src/routes/api")
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// CORS INITIAL
app.use(cors());

// SECURITY IMPLEMENTATION 
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json({limit: "18kb"}));
app.use(express.urlencoded({extended: true, limit: "18kb"}));

const limiter = rateLimit({
    windowMs:15*60*1000,max:3000
})
app.use(limiter);

//ROUTE IMPLEMENT
app.use("/api/v1",router)

//DEFAULT ENDPOINT
app.use("*",(req,res) => {
    res.status(200).json({status: "default", message: "default endpoint"})
} )


module.exports = app;