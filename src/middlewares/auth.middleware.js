const Jwt = require("jsonwebtoken")
exports.authTokenMiddleware = async function(req,res,next){
    try {
        const token = req.headers.authorization.split(" ")[1];
    if(!token){
        res.status(404).json({message: "token not found"})
    }
        const decodeToken = await Jwt.verify(token, process.env.JWT_SECRET_KEY)
        const {email} = decodeToken
    req.headers["email"] = email;
    next()
    } catch (error) {
        res.status(404).json({status: "error", message: "authorization faild"});
        console.log(error)
    }
}