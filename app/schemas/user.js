var mongoose=require("mongoose");
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR=10;
var UserSchema=new mongoose.Schema({//模式
    name:{
        unique:true,
        type:String
    },
    password:String,
    role:{
        type:Number,
        default:0
    },
    email:{
        unique:true,
        type:String
    },
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})
UserSchema.pre('save',function(next){//在存储数据之前调用,是一个中间件
    console.log(this)
    var user=this;
    if(this.isNew){
        this.meta.createAt=Date.now();
    }
    else{
        this.meta.updateAt=Date.now();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        console.log(user.password)
        //"use strict";
        if(err) console.log(err);
        bcrypt.hash(user.password,salt,function(err,hash){
            if(err) return next(err);
            user.password=hash;
            next()
        })
    })
 });
UserSchema.methods.comparePwd=function(_password,cb){
    "use strict";
    bcrypt.compare(_password,this.password,function(err,isMatch){
        if(err) return cb(err)
        cb(null,isMatch)
    })
}
UserSchema.statics={//添加的静态方法是在模型实例化后才能使用
 fetch:function(cb) {
 return this.find({}).sort('meta.updateAt')
 exec(cb)
 },
 findById:function(id,cb){
 return this.findOne({_id: id})
 exec(cb)
 }
 }
module.exports=UserSchema;