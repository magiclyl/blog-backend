var mongoose=require('mongoose');
var BlogSchema=require('../schemas/blog');
var Blog=mongoose.model('Blog',BlogSchema);//编译生成movie模型
module.exports=Blog;