const MessageModel = require('../models/message')

exports.sendMessage = async (req,res)=> {
    try {
        const {conversation,message,picture}=req.body;
        const addMessage = new MessageModel({sender:req.user._id,conversation,message,picture});
        await addMessage.save();
        const populatedMessage = await addMessage.populate("sender");
        return res.status(201).json(populatedMessage)
    } catch (error) {
         console.error(error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
    }

    exports.getMessage = async(req,res)=>{
        try {
            const {convId}=req.params;
            const message = await MessageModel.find({
                conversation:convId
            }).populate("sender")
            return res.status(200).json({message:"Fetched Message Successfully",message})
        } catch (error) {
            console.error(error);
        res.status(500).json({ error: 'Server error', message: error.message });
        }
    }

    
