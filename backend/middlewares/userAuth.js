const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { UserModel } = require("../models/db");

async function usermiddleware(req, res, next) {
    const token = req.cookies.token;
    console.log("Token from cookies in middleware:", token);
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
        let user = null;
        try{
            user = await UserModel.findById(Decoded.userid);
        }catch(e){
            console.log("from middleware no data from db ---",e,"--------------------------------------------------------------------------")
        }
        // console.log("User:", user);
        if (user) {
            req.user = Decoded;
            return next();
        } else if (Decoded) {
            console.log("---------------------- from middleware decoded token:",Decoded.userid,"------------------------------------------------------------------------------")
            req.user = Decoded;
            return next();
        }else{
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