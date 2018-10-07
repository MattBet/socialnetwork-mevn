const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    subject: String,
    message: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('post', postSchema);
module.exports = Post;