var mongoose=require("mongoose");
var BlogSchema=new mongoose.Schema({
    type:String,
    title:String,
    content:String,
    user:String,
    timesamp:{
        type:Date,
        default:Date.now()
    },
    summary:String,
    link:String,
    reading:{type: Number,default: 0},
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
BlogSchema.pre('save',function(next){//在存储数据之前调用
    console.log(this)
    if(this.isNew){
        this.meta.createAt=Date.now();
    }
    else{
        this.meta.updateAt=Date.now();
    }
    next();
});
/*MovieSchema.statics={//添加的静态方法是在模型实例化后才能使用
 fetch:function(cb) {
 return this.find({}).sort('meta.updateAt')
 exec(cb)
 },
 findById:function(id,cb){
 return this.findOne({_id: id})
 exec(cb)
 }
 }*/
module.exports=BlogSchema;