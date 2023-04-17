const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    DOB:{
        type:Number,
        required:true
    },
    Occupation: {
        type:String,
        required:true
    },
    Impression:{
        type:String,
        required:true
    },
    //Learn
    LSubject:{
        type:String,
        required:true
    },
    LTopic:{
        type:String,
        required:true
    },
    LTiming:{
        type:String,
        required:true
    },
    //Teach
    TSubject:{
        type:String,
        required:true
    },
    TTopic:{
        type:String,
        required:true
    },
    TTiming:{
        type:String,
        required:true
    },

},  {timestamps:true  })
module.exports=mongoose.model('User', userSchema)

 