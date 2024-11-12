const mongoose = require('mongoose')
const Memb = require('../Models/membershipsModel')

const getAllMemberships = async (req,res) => {
    try {
        const memb = await Memb.find({})
        res.status(200).json(memb)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createMembership = async (req,res) => {
    const {title, description, persons, price} = req.body

    try {
        const memb = await Memb.create({title, description, persons, price})
        res.status(200).json(memb)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}




module.exports = {
    getAllMemberships,
    createMembership
}

// testing github