const PostModel = require('../models/post');

exports.addPost = async (req, res) => {
    try {
        const { desc, imageLink } = req.body;
        const userId = req.user._id;
        const addPost = new PostModel({ user: userId, desc, imageLink });

        if (!addPost) {
            return res.status(200).json({ error: 'Something went wrong' });
        }

        await addPost.save();

        return res.status(200).json({
            message: 'Post successfully',
            post: addPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

exports.likeDislikePost = async (req, res) => {
    try {
        const selfId = req.user._id;
        const { postId } = req.body;

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(400).json({ error: 'No such post found' });
        }

        const index = post.likes.findIndex(id => id.equals(selfId));

        if (index !== -1) {
            post.likes.splice(index, 1); // unlike
        } else {
            post.likes.push(selfId); // like
        }

        await post.save();

        res.status(200).json({
            message: index !== -1 ? 'Post unliked' : 'Post liked',
            likes: post.likes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

exports.getAllPost = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 }).populate("user", "-password");

        res.status(200).json({
            message: 'Fetched Data',
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await PostModel.findById(postId).populate("user", "-password");

        if (!post) {
            return res.status(400).json({ error: "No such post found" });
        }

        return res.status(200).json({
            message: "Fetched Data",
            post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

exports.getTop5PostForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await PostModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate("user", "-password")
            .limit(5);

        return res.status(200).json({
            message: 'Fetched Data',
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

exports.getAllPostForUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await PostModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate("user", "-password");

        return res.status(200).json({
            message: 'Fetched Data',
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};
