var express = require('express');
var articleModel = require('../model/article.js');
var router = express.Router();
var multer = require('multer');
//指定文件的存储方式
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/images')
    },
    //指定保存的文件名
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.'+file.mimetype.slice(file.mimetype.indexOf('/')+1))
    }
});

var upload = multer({ storage: storage })

router.get('/add',function(req,res){
    res.render('../views/articles/add')
});

//中间件放置的是文件域的名字
router.post('/add',upload.single('img'),function(req,res){
    var article = req.body;
    if(req.file){
        article.img ='/images/'+req.file.filename;
        console.log('222',article.img);
    }
    var user = req.session.user._id;
    article.user = user;
    articleModel.create(article,function(err,article){
        if(err){
            req.flash('error','发表文章失败');
            res.redirect('back');
        }else{
            req.flash('success','发表文章成功');
            res.redirect('/');
        }
    })


});





module.exports = router;

