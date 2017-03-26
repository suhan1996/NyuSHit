/**
 * Created by Suhan on 25/03/2017.
 */
var mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
// my schema goes here!
const Comment = new mongoose.Schema({
    text: String,
    user: String
});
const Link = new mongoose.Schema({
    url: String,
    title: String,
    comment: [Comment]
});

//URLSlugs('<user>');
Link.plugin(URLSlugs('title'));
mongoose.model('Comment', Comment);
mongoose.model('Link', Link);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/hw05');