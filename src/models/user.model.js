const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    todoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }
},{timestamps:true, versionKey:false});

UserSchema.pre("save",async function(next){
    const user = this;

    try {
        if(!user.isModified('password')) return next()

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,salt)
        user.password = hashedPassword
    } catch (error) {
        return next(error)
    }
})

UserSchema.methods.comparedPassword = async function(candidatePassword){
    try {
        const isMatched = await bcrypt.compare(candidatePassword, this.password);
        return isMatched;
    } catch (error) {
        throw new error
    }
}

UserSchema.methods.generateToken = async function(){
    try {
        return Jwt.sign(
            {
                userId : this._id.toString(),
                email : this.email,
                username : this.username
            },
            process.env.JWT_SECRET_KEY
            )
        
    } catch (error) {
        return 
    }
}

const User = mongoose.model("User",UserSchema);



module.exports =User