var express = require('express');
var userModel = require('../model/user.js');
var auth = require('../middle/index.js');
var crypto = require('crypto');

var router = express.Router();

router.get('/reg',auth.checkNotLogin,function(req,res){
 res.render('../views/user/reg',{title:'reg'})
});

router.post('/reg',auth.checkNotLogin,function(req,res){
    var user = req.body;
    var s = crypto.createHash('md5').update(user.email).digest('hex');
        user.avatar = 'http://cn.gravatar.com/avatar/'+s;

    userModel.create(user,function(err,doc){
        if(doc){
            req.flash('success','注册成功');
            req.session.user=doc;
            res.redirect('/');
        }else{
            req.flash('error',err);
            res.redirect('back');
        }
    })
});

router.get('/login',auth.checkNotLogin,function(req,res){
    res.render('../views/user/login')
});

router.post('/login',auth.checkNotLogin,function(req,res){
    var user = req.body;
    userModel.findOne(user,function(err,user){
        if(err){
            req.flash('error',err);
            res.redirect('back');
        }else{
            req.session.user=user;
            req.flash('success','登录成功');
            res.redirect('/');
        }
    });
});

router.get('/logout',auth.checkLogin,function(req,res){
    req.session.user=null;
    res.redirect('/');
});


module.exports = router;
