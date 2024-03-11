
const User = require("../models/user.model")

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

