const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
      },
      otp: {
        type: String,
        require: true,
      },
      status: {
        type: String,
        require: true,
      },
      status: { type: String, require: true },
},{timestamps:true, versionKey:false});

const OtpModel = mongoose.model("Otp",otpSchema);



module.exports =OtpModel