const express = require('express')
const router =express.Router()

const {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    createUser
}= require('../controllers/userController')




//get all users
router.get('/', getUsers )



//get single User 
router.get('/:id', getUser)



//create a new user 
router.post('/', createUser)



//delete user
router.delete('/:id', deleteUser)



//update the user
router.patch('/:id',updateUser)
 module.exports=router 