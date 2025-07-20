const mongoose = require('mongoose');
const ConversationSchema = new mongoose.Schema({
    members:[{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user" ,
            }
        ]
},{timestamps:true})
const conversationtModal=mongoose.model('conversation',ConversationSchema);
module.exports=conversationtModal;