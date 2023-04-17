const mongoose= require('mongoose')
const bcrypt = require('bcrypt')
const validator= require('validator')

const Schema= mongoose.Schema

const userSchema= new Schema({
email:{
    type:String,
    required:true,
    unique:true 
    },
    password:{
        type:String,
        required:true,
    }

})

//static signup method

userSchema.statics.signup=async function(email, password){//using this keywordso no use of arrow fun

    // validation 
    if(!email||!password){
        throw Error('All fiels must be filled')
    }
    const exists= await this.findOne({email})
    if(exists){
        throw Error('email already exists')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error('password is not strong enough')
    }


    const salt= await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create ({
        email,
        password:hash} )
    return user

}

//static login method
userSchema.statics.login=async function(email, password){
    if(!email||!password){
        throw Error('All fiels must be filled')
    }
    const user= await this.findOne({email})

    if(!user){
        throw Error('email not in use')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('invalid login credential')
    }    
    return user
}


module.exports= mongoose.model('userModel', userSchema)