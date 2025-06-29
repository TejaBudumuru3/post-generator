const mongo = require("mongoose");

const userSchema = new  mongo.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const UserModel = mongo.model("LinkedInUser",userSchema, "Linkedin UserData" )
module.exports ={
    UserModel
}
    