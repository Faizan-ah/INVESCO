const { Double, Decimal128 } = require('bson');
const mongoose = require('mongoose');
const { number } = require('prop-types');

//schema 
const Schema= mongoose.Schema;
const BlogPostSchema = new Schema({
    name: String,
    age: String,
});

//model
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

module.exports = BlogPost;