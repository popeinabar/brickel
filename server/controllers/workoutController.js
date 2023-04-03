const workouts = require ('../models/workouts')
const mongoose = require('mongoose');

//get all workout
const getWorkouts = async(req, res)=>{
    const Workouts = await workouts.find({}).sort({createdAt:-1})
    res.status(200).json(Workouts)
}



//get a single workout
const getWorkout=async (req, res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }
    const workout = await workouts.findById(id) 
    if(!workout) {
        return res.status(404).json({error:'no such dir found'})
    }
    res.status(200).json(workout)
}           



//create a new workout
const createWorkout = async(req, res)=>{
    
    const {title, load, reps}= req.body
    //add doc to db
        try{
                const workout = await workouts.create({
                    title, load, reps
                })
                res.status(200).json(workout)
        }catch(error){
            res.status(400).json({error: error.message})
        }
}



//delete a new workout

const deleteWorkout = async(req, res)=>{
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }
    const workout= await workouts.findOneAndDelete({_id: id})

    if(!workout) {
        return res.status(404).json({error:'no such dir found'})
    }
    res.status(200).json(workout)
}

//update workout 
const updateWorkout= async (req, res)=>{
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'no such workout'})
    }
    const workout= await workouts.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout) {
        return res.status(404).json({error:'no such dir found'})
    }
    res.status(200).json(workout)

}



module.exports={
    getWorkouts,
    createWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout 
    
}