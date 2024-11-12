const express = require('express')
const Sport = require('../Models/sportModel')
const {getSport,getAllSports,createSport,deleteSport,updateSport} = require('../controllers/sportsControllers')

 const router = express.Router()

//Get all
router.get('/', getAllSports)

//Get particular
router.get('/:id', getSport)

//Post new Sport
router.post('/', createSport)

//Delete Sport
router.delete('/:id', deleteSport)

//Update Sport
router.patch('/:id', updateSport)


 module.exports = router