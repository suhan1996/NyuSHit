// app.js

// Use __dirname to construct absolute paths for:

// 1. express-static
// 2. hbs views

// (the instructions have details on how to do this)

// LISTEN ON PORT 3000

// express static setup
const path = require('path');
const express = require("express");
const session = require("express-session");
const db = require("./db");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
const sessionOptions = {
    secret: 'secret for signing session id',
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));
// hbs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const mongoose = require('mongoose');
const Link = mongoose.model('Link');


// start
app.get('/', function(req, res) {
    //res.render('templating-arrays', {'luckyNumbers':[42, 7, 78, 3, 5]});
    //a form to add a link
    //a list of all of the links added so far
    // (to display all links and the form)
    Link.find({}, (err, new_post) => {
        console.log(err);
        console.log(new_post);
        // render goes in callback
        // because it has to wait for find to finish

        let ary = [], post_sorted = [];
        new_post.forEach(function(x){ary.push(x.vote)});
        ary = ary.sort().reverse();
        let set1 = new Set(ary);
        console.log("arrrry", ary)
        set1.forEach(function(x){
            "use strict";
            new_post.forEach(function(e){
            if (e.vote == x) {
                post_sorted.push(e)
            }}
            )
        })
        console.log("post sorted",post_sorted);
        res.render('main', {new_post: post_sorted});

    });

});

app.get('/:var1',function(req, res){
    "use strict";
    let slg = req.params.var1;
    console.log(req.params.var1);
    let last_name = req.session.name;
    let last_comment = req.session.comment;
    console.log("last_",last_comment,last_name)
    Link.findOne({slug:slg }, function(err, the_post) {
        //console.log(err, the_post);
        res.render('comment', {the_post: the_post, last_name:last_name, last_comment:last_comment});
    });
    //Comment.find({},(err, all_comment) => {
    //    console.log(all_comment);
    //    res.render('comment', {all_comment:all_comment})//not sure if its right or not
    //})
})

app.post('/comment',function(req, res){
    Link.findOne({slug:req.body.hidden}, function(err, the_link) {
        // we can call push on toppings!
        console.log(req.body.name,req.body.comment);
        the_link.comment.push({user: req.body.name, text: req.body.comment});
        if(req.body.vote != undefined){
            console.log("upvote");
            console.log("the link", the_link);
            the_link.vote += 1;
            console.log(the_link.vote)
        }
        console.log("what's wrong??",req.body.vote,the_link.vote)
        the_link.save(function(saveErr, savePizza) {
            console.log(savePizza);
        });
        req.session.name = req.body.name;
        req.session.comment = req.body.comment;

        res.redirect('/'+req.body.hidden);
    });
})

app.post('/post', function(req, res) {
    console.log("test1");
    //myName = req.body.myName;
    const linkone = new Link({
        url: req.body.url,
        title: req.body.title,
        vote: 0
       // comments: [Comment]
    });
    linkone.save((err) => {
        if(err) {
            console.log(err);
        }
        else{
        res.redirect('/');
        }
    });
});

//function voting(vote) {
//    document.getElementById("#plus").click(function(){
//        console.log("click plus");
//        vote = vote+1;
//    });
//    document.getElementById("#minus").click(function(){
//        console.log("click minus");
//        vote = vote+1;
//    });
//}



app.listen(8888);
