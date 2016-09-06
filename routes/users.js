var express = require('express');
var userModel = require('../model/user.js');
var auth = require('../middle/index.js');

var router = express.Router();

router.get('/reg',auth.checkNotLogin,function(req,res){
 res.render('../views/user/reg',{title:'reg'})
});

router.post('/reg',auth.checkNotLogin,function(req,res){
    userModel.create(req.body,function(err,doc){
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
  res.send('login');
});

router.get('/logout',auth.checkLogin,function(req,res){
    req.session.user=null;
    res.redirect('/');
});


module.exports = router;
