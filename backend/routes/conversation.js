const express = require('express')
const router = express.Router();
const Authentication = require('../authentication/auth')
const conversationController = require('../controller/conversation')

router.post('/add-conversation',Authentication.auth,conversationController.addConversation)
router.get('/get-conversation',Authentication.auth,conversationController.getConversation)






module.exports=router;