const CommentModal = require( '../models/comment' );
const PostModal = require( '../models/post' );
const NotificationModal = require( '../models/notification' );

exports.commentPost = async ( req, res ) =>
{
    try
    {
        const { postId, comment } = req.body;
        const userId = req.user._id;

        const postExist = await PostModal.findById( postId ).populate( "user" );
        if ( !postExist )
        {
            return res.status( 400 ).json( { error: "No such post found" } );
        }
        postExist.comments = postExist.comments + 1;
        await postExist.save();

        const newComment = new CommentModal( { user: userId, post: postId, comment } );
        await newComment.save();

        const populatedComment = await CommentModal.findById( newComment._id )
            .populate( 'user', 'f_name headlines profilePic' );

        const content = `${ req.user.f_name } has commented on your post`;
        const notification = new NotificationModal( {
            sender: userId, reciever: postExist.user._id,
            content, type: "comment", postId: postId.toString()
        } );
        await notification.save();
        return res.status( 200 ).json( {
            message: "Commented Successfully",
            comment: populatedComment
        } );

    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { error: 'Server error', message: error.message } );
    }
};


exports.getCommentedByPostId = async ( req, res ) =>
{
    try
    {
        const { postId } = req.params;
        const isPostExist = await PostModal.findById( postId );
        if ( !isPostExist )
        {
            return res.status( 400 ).json( { error: "No such post found" } );
        }
        const comments = await CommentModal.find( { post: postId } )
            .sort( { createdAt: -1 } ).populate( "user", "f_name  headlines profilePic " );
        return res.status( 201 ).json( {
            message: "Comment fetched",
            comments: comments
        } );
    } catch ( error )
    {
        console.error( error );
        res.status( 500 ).json( { error: 'Server error', message: error.message } );
    }
};
