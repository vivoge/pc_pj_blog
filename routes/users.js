var express = require('express');
var router = express.Router();

router.get('/reg',function(req,res){
 res.render('../views/user/reg',{title:'reg'})
});

router.post('/reg',function(req,res){
  res.send('reg');
});

router.get('/login',function(req,res){
  res.render('../views/user/login')
});

router.post('/login',function(req,res){
  res.send('login');
});

router.get('/logout',function(req,res){
  res.render('../views/user/logout');
});


module.exports = router;
