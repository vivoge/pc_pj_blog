var express = require('express');
var articleModel = require('../model/article.js');
var markdown = require('markdown').markdown;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

        articleModel.find().populate('user').exec(function(err,articles){
            if(err){
                req.flash('error',err);
                res.redirect('/');
            }else{
                articles.forEach(function(item){
                    item.content = markdown.toHTML(item.content);
                });
                res.render('../views/index', {articles:articles});
            }
        });


});

module.exports = router;


//populate('user').

//for (var i = 0;i<articles.length;i++){
//    var article=articles[i];
//    article.title
//}