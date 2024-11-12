const mongoose = require('mongoose')
const Sport = require('../Models/sportModel')
//get all

const getAllSports = async (req,res) => {

    try {
        const sports = await Sport.find({})
        res.status(200).json(sports)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get single
const getSport = async (req,res) => {

    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({mssg: 'Not found'})
        }
    
        const sport = await Sport.findById(id) 
        if(!sport){
            res.status(404).json({mssg: 'Not found'})
        }       
        res.status(200).json(sport)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//create new
const createSport = async (req,res) => {
    
    const {title, description, location,sessions ,price} = req.body

    try {
        const sport = await Sport.create({title, description, location,sessions ,price})
        res.status(200).json(sport)
    } catch(error){
        res.status(400).json({error: error.message})
    }
    
}
//delete 

const deleteSport = async (req,res) => {

    try {
        const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: 'Not found'})
    }

    const del = await Sport.findOneAndDelete({_id: id})

    if(!del){
        res.status(404).json({mssg: 'Not found'})
    }

    res.status(200).json(del)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

// update
const updateSport = async (req,res) => {
    try {
        const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: 'Not found'})
    }

    const upd = await Sport.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!upd){
        res.status(404).json({mssg: 'Not found'})
    }


    res.status(200).json(upd)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getSport,
    createSport,
    getAllSports,
    deleteSport,
    updateSport
}
