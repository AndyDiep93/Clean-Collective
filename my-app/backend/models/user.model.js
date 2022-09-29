const company = require('./company.model');
const userPost = require("./users.post.model");
const mongoose = require('mongoose');


const Schema = mongoose.Schema;



const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    confirmedAccount: {
        type: Boolean,
        default: false
    },
    associatedCompanies: {
        type: [company.companySchema]
    },
    posts :{
        type: [userPost.userPostSchema]
    }
   
},
{
    timestamps: true
}
);


const UserCollection = mongoose.model("User",  userSchema);

module.exports = {UserCollection, userSchema};