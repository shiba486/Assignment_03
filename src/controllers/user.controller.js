
const User = require("../models/user.model")
const OtpModel = require("../models/otp.model")

//user create
exports.userCreate = async function(req,res){
    try {
        const data = req.body
        const newUser = new User(data)
        const response = await newUser.save()
        if(!response){
            return res.status(404).json({message: "User not Create", })
        }
        const accessToken = await response.generateToken()
        res.status(404).json({status: "ok", message: "User Create successfully", token: accessToken})

    } catch (error) {
        res.status(404).json({status: "erro", message: "User create Error"})
        console.log(error)
    }
}

//user logged in
exports.loginUser = async function(req,res){
    const {username,password} = req.body

    const user = await User.findOne({username: username})
    if(!user){
        return res.status(404).json({message: "User not found", })
    }
    const isPasswordmatched = await user.comparedPassword(password);
    if(isPasswordmatched){
        const accessToken = await user.generateToken();
        res.status(200).json({ msg: "Log in Successfull", token: accessToken, data: user });
    }else{
        res.status(404).json({ msg: "invalid password" });
    }
}

//user find
exports.findUser = async function(req,res){
    try {
        const email = req.headers["email"];
        const response = await User.findOne({email: email})
        if(!response) return "user not found"
        res.status(200).json({message: "ok", data: response})
    } catch (error) {
        res.status(200).json({message: "ok", error: "finding error"});
        console.log(error)
    }
}

//user update
exports.updateUser = async function(req,res){
    try {
        const userId = req.params.id;
        const email = req.headers["email"];
        const data = req.body
        // const updating = await User.findByIdAndUpdate(userId,data,{new:true, runValidators: true})
        const updating = await User.updateOne({email: email, _id: userId},data)
        if (!updating) {
            res.status(404).json({ message: "user not updated" });
          }
          res.status(200).json({ message: "updated", data: updating });
        
    } catch (error) {
        res.status(200).json({message: "sorry", error: "updating error"});
        console.log(error)
    }
}

//user delete
exports.deleteUser = async function(req,res){
    try {
        const email = req.headers["email"];
        const userId = req.params.id;
        const deleteUser = await User.deleteOne({email: email,_id: userId})
        if (!deleteUser) {
            res.status(404).json({ message: "person not found" });
          }
          res.status(200).json({ message: "updated", data: deleteUser });
    } catch (error) {
        res.status(200).json({message: "sorry", error: "deleting error"});
        console.log(error)
    }
}


exports.verifyEmail = async function(req,res){
    const {email} = req.params;
    const user = await User.findOne({email:email});
    console.log(user)
    if(user){
        // sendemail
        let otp = Math.floor(1000000+Math.random()*900000)
        await sendEmail(email,`your pin ${otp}`,"email verification code")
        await OtpModel.create({email:email,otp: otp,status: "active"})
        res.status(200).json({status: "ok", message: "Verification code has been sent"})
    }else{
        res.status(404).json({ message: "No user found"})
    }
}
exports.verifyOTP = async function (req,res){
    try {
       const {email,otp} = req.params
       let user = await OtpModel.find({email: email, otp: otp})
       if(user.length > 0){
        await OtpModel.updateOne({email: email,otp: otp},{status: "verified"})
        res.json({status:"success",message:"Code Verification Success"})
       }
       else{
        res.json({status:"fail",message:"invalid Code"})
       }
    } catch (error) {
        res.status(200).json({message: "sorry", error: "otp error"});
        console.log(error)
    }
}

exports.passwordReset = async function (req,res){
    try {
       const {email,otp,password} = req.params
       let user = await OtpModel.find({email,otp: otp,status: "verified"});
       if(user.length > 0){
        await OtpModel.deleteOne({email:email, otp: otp});
        await User.updateOne({email: email},{password: password});
        res.json({status:"success",message:"Password Update Success"})
       }else{
        res.json({status:"fail",message:"Invalid Request"})
    }

    } catch (error) {
        res.status(200).json({message: "sorry", error: "password reset fail error"});
        console.log(error)
    }
}