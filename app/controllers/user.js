var User=require('../models/user');

//signin
exports.signin = (req,res)=>{//params是query，body的封装
    "use strict";
    var _user = req.body;
    var user=new User(_user);
    user.save((err,user)=>{
        if(err) console.log(err)
        res.send({result:0,message:"注册成功"})
        //res.redirect('/signin')
    })
}
//signup
exports.signup = (req,res)=>{
    "use strict";
    var _user = req.body;
    var name=_user.name;
    var password=_user.password;
    User.findOne({name:name},function(err,user){
        if(err) console.log(err)
        if(!user) return res.send({result:1,message:"用户名不存在"})
        user=new User(user);
        user.comparePwd(password,function(err,isMatch){
            if(err) console.log(err)
            if(isMatch){
                req.session.user=user;
                //return res.redirect('/')
                res.send({result:0,message:"成功"})
            }
            else {
                console.log("password is not matched")
                res.send({result:1,message:"用户名密码不匹配"})
               // res.redirect('/signin')
            }
        })
    })
}
//userlist
exports.list=function(req,res){
    "use strict";
    User.find((err,users)=>{
        if(err) console.log(err)
        res.render('userlist',{
            title:'用户列表页',
            users:users
        })
    })
}
//logout
exports.logout=function(req,res){
    "use strict";
    delete req.session.user
    res.redirect('/')
}
exports.showSignup=function(req,res){
    "use strict";
   res.render('signup',{
       title:'注册页面'
   })
}
exports.showSignin=function(req,res){
    "use strict";
    res.render('signin',{
        title:'登录页面'
    })
}
exports.del=function(req,res){
    var id = req.query.id;
    if (id) {
        User.remove({_id: id}, (err, user) => {
            if (err) console.log(err)
            else res.json({success: 1})
        })
    }
}