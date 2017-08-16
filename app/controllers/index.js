var Movie=require('../models/Movie');
exports.index=(req,res)=>{
    Movie.find((err,movies)=>{
        if(err){
            console.log(err)
        }
        res.render('index',{
            title:'电影',
            movies:movies
        })
    })
}