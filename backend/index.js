const express = require('express');
const mongoose = require('mongoose'); // Missing import
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config(); // Loads variables from .env file

const app = express();
const PORT =process.env.PORT || 4000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))


const UserRoutes = require('./routes/user');
const PostRoutes = require('./routes/post')
const NotificationRoutes=require('./routes/notification')
const CommentRoutes = require('./routes/comment')
const conversationRoutes = require('./routes/conversation')
const MessageRoutes=require('./routes/message')






app.use('/api/auth',UserRoutes)
app.use('/api/post',PostRoutes)
app.use('/api/notification',NotificationRoutes)
app.use('/api/comment',CommentRoutes)
app.use('/api/conversation',conversationRoutes)
app.use('/api/message',MessageRoutes)



// Start server
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
