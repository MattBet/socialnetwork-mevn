const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	username: String,
    subject: String,
    message: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('post', postSchema);
module.exports = Post;