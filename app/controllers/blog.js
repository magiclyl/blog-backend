var Blog=require('../models/Blog');
var _=require('underscore');

//detail
exports.detail=(req, res) => {
    Blog.findById(id, (err, blog) => {
        res.send({
            result: 0,
            data: blog
        })
    })
}
exports.addReading=(req, res) => {
    var id=req.param('id');
    var _blog;
    if(!id) return;
    Blog.findOne({_id:id}, (err, blog) => {
        blog.update({reading:blog.reading++})
        _blog = _.extend(blog, {reading:blog.reading++});//对象里的字段替换
        _blog.save((err, blog) => {

        })
    })
}
//update
exports.update=(req, res) => {
    var id = req.body.movie._id;
    if (id) {
        Blog.findById(id, (err, movie) => {
            res.render('admin', {
                title: '后台更新',
                movie: movie
            })
        })
    }
}
exports.saveBlog=(req, res) =>{
    "use strict";
    console.log(req.body)
    var blogObj=req.body;
    var blog = new Blog({
        title: blogObj.title,
        content: blogObj.content,
        type: blogObj.type,
        summary: blogObj.summary,
        link:blogObj.link
    });
    blog.save((err, blog) => {
        if (err) console.log(err)
        else res.send({result:0,message:"成功",data:blog})
    })
}
//save
exports.save=(req, res) => {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie
    if (id !== undefined) {
        Blog.findById(id, (err, movie) => {
            _movie = _.extend(movie, movieObj);//对象里的字段替换
            _movie.save((err, movie) => {
                res.redirect(`/movie/${movie._id}`);
            })
        })
    }
    else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save((err, movie) => {
            if (err) console.log(err)
            res.redirect(`/movie/${movie._id}`);
        })
    }
}
//list
exports.getList=(req, res) => {
    var type=req.param('type');
    var page=req.param('page');
    console.log(type)
    console.log(page)
    Blog.find({type:type}).skip((page-1)*10).limit(10).sort({"timesamp":-1}).exec((err, blog)=>{
        "use strict";
        if (err) console.log(err)
        else res.send({result:0,data:blog,pageSize:10})
    })
}
//listByKeyword
exports.getListByKeyword=(req, res) => {
    var title=req.param('keyword');
    var page=req.param('page');
    console.log(page)
    Blog.find({title:new RegExp(title)}).skip((page-1)*10).limit(10).sort({"timesamp":-1}).exec((err, blog)=>{
        "use strict";
        if (err) console.log(err)
        else res.send({result:0,data:blog,pageSize:10})
    })
}
//删除功能
exports.del=(req, res) => {
    var id = req.query.id;
    if (id) {
        Blog.remove({_id: id}, (err, movie) => {
            if (err) console.log(err)
            else res.json({success: 1})
        })
    }
}