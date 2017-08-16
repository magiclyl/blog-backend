var mongoose=require("mongoose");
var MovieSchema=new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    summary:String,
    country:String,
    flash:String,
    poster:String,
    year:String,
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
MovieSchema.pre('save',function(next){//在存储数据之前调用
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
module.exports=MovieSchema;