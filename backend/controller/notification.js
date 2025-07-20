const NotificationModal = require('../models/notification') 



exports.getNotification=async(req,res)=>{
    try {
        const ownId = req.user._id;
        const notifications=await NotificationModal.find({reciever:ownId})
        .sort({createdAt:-1}).populate("sender reciever");
        return res.status(200).json({
            message:"Notification Fetched Successfully",
            notifications:notifications
        })
    } catch (error) {
        console.error( error );
        res.status( 500 ).json( { error: 'Server error', message: err.message } );
    }
}

exports.updateRead=async(req,res)=>{
    try {
        const {notificationId}=req.body;
        const notification = await NotificationModal.findByIdAndUpdate(notificationId,{isRead:true});
        if(!notification){
            return res.status(404).json({error:"Notification not found"});
        }
        return res.status(200).json({
            message:"Read Notification"
        })
    } catch (error) {
        console.error( error );
        res.status( 500 ).json( { error: 'Server error', message: err.message } );
    }
}

exports.activeNotify= async(req,res)=>{
    try {
        const ownId=req.user._id;
        const notifications= await NotificationModal.find({reciever:ownId,isRead:false});

        return res.status(200).json({
            message:"Notifications Number Fetched Successfully",
            count:notifications.length
        })
    } catch (error) {
        console.error( error );
        res.status( 500 ).json( { error: 'Server error', message: err.message } );
    }
}