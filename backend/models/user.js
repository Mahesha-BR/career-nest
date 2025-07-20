const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {

    googleId: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    f_name: {
        type: String,
        default: ""
    },
    headlines: {
        type: String,
        default: ""
    },
    curr_company: {
        type: String,
        default: ""
    },
    curr_location: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
    },
    cover_pic: {
        type: String,
        default: "https://scop.co.in/wp-content/themes/drpiti/assets/images/contact-banner.jpg"
    },
    about: {
        type: String,
        default: ""
    },
    skills: {
        type: [ String ],
        default: []
    },
    experience: [
        {
            designation: {
                type: String,
            },
            company_name: {
                type: String,
            },
            duration: {
                type: String,
            },
            location: {
                type: String,
            }
        }
    ],
    friends: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    pending_friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    resume: {
        type: String,
    },
},{timestamps:true} );

const userModal=mongoose.model('user',UserSchema);
module.exports=userModal;