const express = require('express')

const {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    createUser
}= require('../controllers/userController')

const requireAuth= require('../middleware/requireAuth')


const router =express.Router()

//require auth for all user data
router.use(requireAuth)

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