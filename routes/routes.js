var Index=require('../app/controllers/index');
var Movie=require('../app/controllers/movie');
var User=require('../app/controllers/user');
var Blog=require('../app/controllers/blog');
var _=require('underscore');
module.exports=function(app){
    "use strict";
//pre
    app.use(function(req,res,next){
        "use strict";
        var _user=req.session.user;
        app.locals.user=_user;
        next()
    })
//all
    app.all('*', (req, res, next) => {
        console.log('we are handling cookies');
        next();
    })
//index
    app.get('/',Index.index)
//movie
    app.get('/movie/:id',Movie.detail)
    app.get('/admin/update/:id',Movie.update)
    app.post('/admin/movie/new',Movie.save)
    app.get('/admin/list',Movie.list)
    app.get('/admin/movie',Movie.new)
    app.delete('/admin/list',Movie.del)
//user
    app.post('/user/signup',User.signup)
    app.post('/user/signin',User.signin)
    app.get('/admin/userlist',User.list)
    app.get('/logout',User.logout)
    app.get('/signup',User.showSignup)
    app.get('/signin',User.showSignin)
    app.delete('/list',User.del)
//blog
    app.get('/blog/getList',Blog.getList)
    app.post('/blog/saveBlog',Blog.saveBlog)
    app.get('/blog/addReading',Blog.addReading)
    app.post('/blog/signIn',User.signin)
    app.post('/blog/signUp',User.signup)
    app.get('blog/logout',User.logout)
    app.get('/blog/getListByKeyword',Blog.getListByKeyword)
}


