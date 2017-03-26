// app.js

// Use __dirname to construct absolute paths for:

// 1. express-static
// 2. hbs views

// (the instructions have details on how to do this)

// LISTEN ON PORT 3000

// express static setup
const path = require('path');
const express = require("express");
const db = require("./db");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
// hbs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const mongoose = require('mongoose');
const Link = mongoose.model('Link');
let new_post = {};


app.get('/', function(req, res) {
    //res.render('templating-arrays', {'luckyNumbers':[42, 7, 78, 3, 5]});
    //a form to add a link
    //a list of all of the links added so far
    // (to display all links and the form)

    Link.find({}, (err, new_post) => {
        console.log(err);
        //console.log(new_post);
        new_post.forEach(x =>
            app.get("/"+x.slug, function(req, res) {
                "use strict";


            })



        );

        // render goes in callback
        // because it has to wait for find to finish
        res.render('main', {new_post: new_post});
    });

});



app.post('/post', function(req, res) {
    console.log("test1");
    //myName = req.body.myName;
    //menu.push({name:req.body.name,description:req.body.description,category:req.body.filterCategory});
    const linkone = new Link({
        url: req.body.url,
        title: req.body.title
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

app.listen(3000);
