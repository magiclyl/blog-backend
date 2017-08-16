var express=require("express");
var app=express();
var port = process.env.PORT||3000;
var path=require('path');
var cookieParser=require('cookie-parser');
var logger = require('morgan')
var session=require('express-session')
var mongoStore=require('connect-mongo')(session)
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/imooc');/////mongod.exe --dbpath d:\mongodb\data\db
app.set('views','./app/views/pages');
app.set('view engine','jade');
app.locals.moment=require('moment')
app.use(express.static(path.join(__dirname,'bower_components')))
var bodyParser = require('body-parser')
var dbUrl='mongodb://localhost/imooc';
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser())
app.use(cookieParser())
app.use(session({
    secret:'imooc',
    store:new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}))
if('development'===app.get('env')){//开发模式下日志功能
    app.use(logger(':method:url:status'))
    mongoose.set('debug',true)
}
require('./routes/routes')(app)
const log= (ctx, next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
}
app.use(log);
app.listen(port);
console.log("movies site started at "+port);
//npm init xx --save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。
//jade模板引擎
//mongoose:mongdb数据库建模

