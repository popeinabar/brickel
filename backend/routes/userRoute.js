const express=require('express')

const router = express.Router()

//controller fun
const {signupUser,loginUser }= require('../controllers/controller')


//loging route
router.post('/login',loginUser)




//singup route
router.post('/signup',signupUser)


module.exports= router