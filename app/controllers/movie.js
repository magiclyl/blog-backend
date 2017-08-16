var Movie=require('../models/Movie');
var _=require('underscore');

//detail
exports.detail=(req, res) => {
    var id = req.params.id;
    Movie.findById(id, (err, movie) => {
        res.render('detail', {
            title: movie.title,
            movie: movie
        })
    })
}
//update
exports.update=(req, res) => {
    var id = req.body.movie._id;
    if (id) {
        Movie.findById(id, (err, movie) => {
            res.render('admin', {
                title: '后台更新',
                movie: movie
            })
        })
    }
}
//save
exports.save=(req, res) => {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie
    if (id !== undefined) {
        Movie.findById(id, (err, movie) => {
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
exports.list=(req, res) => {
    Movie.find((err, movies) => {
        if (err) {
            console.log(err)
        }
        res.render('list', {
            title: '列表页',
            movies: movies
        })
    })
}

//后台录入页
exports.new=(req, res) => {
    res.render('admin', {
        title: '后台录入页',
        movie: {
            title: "",
            doctor: "",
            country: "",
            poster: "",
            language: '',
            flash: '',
            summary: ""
        }
    })
}

//删除功能
exports.del=(req, res) => {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, (err, movie) => {
            if (err) console.log(err)
            else res.json({success: 1})
        })
    }
}