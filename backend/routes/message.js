const express = require('express')
const router = express.Router();
const Authentication = require('../authentication/auth')
const MessageController = require('../controller/message')


router.post('/',Authentication.auth,MessageController.sendMessage)
router.get('/:convId',Authentication.auth,MessageController.getMessage)





module.exports=router;