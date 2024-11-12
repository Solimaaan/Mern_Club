const express = require('express')
const myUser = require('../Models/usersModel')
const { getAllUsers, getUser, loginUser, createUser, deleteUser, updateUser} = require('../controllers/userControllers')

 const router = express.Router()

//Get all
router.get('/', getAllUsers)

//Get particular
router.get('/:id', getUser)

//Login
router.post('/login', loginUser)

//Post new Sport
router.post('/', createUser)

//Delete Sport
router.delete('/:id', deleteUser)

//Update Sport
router.patch('/:id', updateUser)


 module.exports = router