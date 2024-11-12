const express = require('express')
const Membership = require('../Models/membershipsModel')
const {getAllMemberships, createMembership} = require('../controllers/membershipsControllers')

const router = express.Router()

//Get all
router.get('/', getAllMemberships)

router.post('/', createMembership)

module.exports = router