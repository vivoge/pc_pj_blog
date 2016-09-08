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

router.get('/update/:id',function(req,res){
    var _id = req.params.id;
    articleModel.findById(_id,function(err,docs){
        res.render('../views/articles/update',{docs:docs});
    });
});


router.post('/update',upload.single('img'),function(req,res){
    var article = req.body;
    var _id = article._id;

    if(_id){
        var set = {title:article.title,content:article.content};
        if(req.file){
            set.img ='/images/'+req.file.filename;
        }
        articleModel.update({_id:_id},{$set:set},function(err,article){
            if(err){
                req.flash('error','更新文章失败');
                res.redirect('back');
            }else{
                req.flash('success','更新文章成功');
                res.redirect('/');
            }
        })

    }


});


//中间件放置的是文件域的名字
router.post('/add',upload.single('img'),function(req,res){
    var article = req.body;

    if(req.file){
        article.img ='/images/'+req.file.filename;
    }
    var user = req.session.user._id;
    article.user = user;
    articleModel.create(article,function(err,article){
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            req.flash('success','发表文章成功');
            res.redirect('/');
        }
    });






});

router.get('/detail/:id',function(req,res){
    var _id = req.params.id;
    articleModel.findById(_id,function(err,docs){
        res.render('../views/articles/detail',{docs:docs});
    });
});

router.get('/delete/:id',function(req,res){
    var deleteId = req.params.id;
    articleModel.remove({_id:deleteId},function(err,result){
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            req.flash('success','删除文章成功');
            res.redirect('/');
        }
    });
});






module.exports = router;

