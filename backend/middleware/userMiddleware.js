const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

const userMiddleware = ((req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({error: "Authorization token missing or malformed"})
    }

    const token = authHeader.split(" ")[1]
 
    try{
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token", error: err.message });
            }

            if(decoded.userId){
                req.userId = decoded.userId
                next()
            }
        })   
    }
    catch(e){
        return res.status(403).json({e});
    }

})

module.exports = {userMiddleware}