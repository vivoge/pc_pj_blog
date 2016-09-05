var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sange_blog');

var UserSchema= new mongoose.Schema({
     username:String,
    password:String
});

var UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;