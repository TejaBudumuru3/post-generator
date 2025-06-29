// const jwt = require("jsonwebtoken")

// function authMiddleware(req, res, next){
//     const token = req.cookies.token;
//     if(!token){
//         return res.status(401).json({ message: "Unauthorized access, please login" });
//     }
//     else{
//         try{
//             const decode = jwt.verify(token,process.env.JWT_SECRET)
//             req.user = decode;
//             return next();
//         }
//         catch(e){
//             return res.status(400).json({ message: "token expired or invalid" });
//         }
//     }
// }

// module.exports = { authMiddleware}

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { UserModel } = require("../models/db");

async function usermiddleware(req, res, next) {
    const token = req.cookies.token;
    //const token = req.headers.token;
    if (!token) {
        console.log("No token provided");
        return res.status(401).json({
            message: "invalid token or token not provided"
        });
    }
    try {
        const Decoded = jwt.verify(token, JWT_SECRET);
        // console.log("Decoded:", Decoded);
        const user = await UserModel.findById(Decoded.userid);
        // console.log("User:", user);
        if (user) {
            req.user = Decoded;
            return next();
        } else {
            return res.status(401).json({ message: "you are not signed in" });
        }
    } catch (err) {
        console.log("JWT error:", err);
        return res.status(401).json({ message: "token verification failed" });
    }
}

module.exports = {
    usermiddleware: usermiddleware
}