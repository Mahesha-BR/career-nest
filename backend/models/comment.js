const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
     user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user" ,
            required:true 
        },
         post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"post" ,
            required:true 
        },
        comment:{   // ✅ FIXED: 'comments' ➝ 'comment'
            type:String,
            required:true
        }

},{timestamps:true})
const commentModal=mongoose.model('comment',CommentSchema);
module.exports=commentModal;
