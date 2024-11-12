const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const myUser = require('../Models/usersModel')

//get all
const getAllUsers = async (req,res) => {

    try {
        const user = await myUser.find({})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get single
const getUser = async (req,res) => {

    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({mssg: 'Not found'})
        }
    
        const user = await myUser.findById(id) 
        if(!user){
            res.status(404).json({mssg: 'Not found'})
        }       
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//login
const loginUser = async (req, res) => {
    const { mail, password } = req.body;

    try {
        // Check if user exists
        const user = await myUser.findOne({ mail });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // If success, return a response
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//create new
const createUser = async (req,res) => {
    
    const {name, mail, password, dateOfBirth, phoneNumber} = req.body
    
    try {
        const membershipNumber = await generateMembershipNumber();

        const newUser = new myUser({
            name,
            mail,
            password,
            dateOfBirth,
            phoneNumber,
            membershipNumber,
            userType: 'Pending',
            status: 'Pending',
        });
        const user = await newUser.save()
        res.status(200).json(user)
    } catch(error){
        res.status(400).json({error: error.message})
    }
    
}


const deleteUser = async (req,res) => {

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
const updateUser = async (req,res) => {
    try {
        const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: 'Not found'})
    }

    const upd = await myUser.findOneAndUpdate({_id: id}, {
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


//helper methods
const generateMembershipNumber = async () => {
    let membershipNumber;
    let exists = true;

    while (exists) {
        membershipNumber = Math.floor(100000 + Math.random() * 900000);  // Generates a 6-digit number
        const existingUser = await myUser.findOne({ membershipNumber });
        if (!existingUser) {
            exists = false;  // Ensure uniqueness
        }
    }

    return membershipNumber;
};

module.exports = {
    getAllUsers,
    getUser,
    loginUser,
    createUser,
    deleteUser,
    updateUser
}
