const express = require('express')
 const router =express.Router()
const workouts = require('../models/workouts')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}= require('../controllers/workoutController')




//get all workout
router.get('/', getWorkouts )



//get single workout 
router.get('/:id', getWorkout)



//create a new workout 
router.post('/', createWorkout)



//delete workout
router.delete('/:id', deleteWorkout)



//update the workout
router.patch('/:id',updateWorkout)
 module.exports=router