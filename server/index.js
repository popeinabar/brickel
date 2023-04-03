require('dotenv').config()
// const path= require('path')
// const fs= require('fs')
const express = require('express');


//express app
const app = express();
const workoutRoutes= require('./routes/workout')


//mongoose
const mongoose =require('mongoose')


//relative module
// console.log(__dirname)



// console.log(path.join(__dirname, '../client'));
// const staticPath = path.join(__dirname, '../client/src/index.js')
// console.log(staticPath)
//builtin middleware

//middleware
app.use(express.json()) 
app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next()
})

//routes
app.use('/api/workout',workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then( ()=>{
    app.listen(process.env.PORT, () => {
      console.log('Connnected to db and Server is listening on port', process.env.PORT);
    });
    
  })
  .catch((error)=>{
    console.log(error)
  })









