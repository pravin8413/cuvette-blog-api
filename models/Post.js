// database schema

const mongoose = require("mongoose");

const postScheme = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})

const Post = mongoose.model('Post',postScheme);


module.exports = Post;