const Workout = require('../models/workouts')
const mongoose = require('mongoose')

const findWorkouts = async (req, res) =>{
        const user_id = req.user._id
        const workout = await Workout.find({user_id}).sort({createdAt: -1})
        res.status(200).json(workout)
}


const findWorkout = async (req, res) =>{
    const { id }= req.params
   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:" ⛔ 🆔"})
    }
        const workout = await Workout.findById(id)

        if(!workout){
           return res.status(404).json({error: 'No such workout'})
        }
        res.status(200).json(workout)
    
}


const createWorkout = async (req, res)=>{
    const {title ,load , reps} = req.body

    try{
        const user_id = req.user._id
        const workout = await Workout.create({title ,load , reps, user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req, res) =>{
    const { id }= req.params
   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:" ⛔ 🆔"})
    }
        const workout = await Workout.findOneAndDelete({_id: id})

        if(!workout){
           return res.status(404).json({error: 'No such workout'})
        }
        res.status(200).json(workout)
    
}
const updateWorkout = async (req, res) =>{
    const { id }= req.params
   
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:" ⛔ 🆔"})
    }
        const workout = await Workout.findOneAndUpdate({_id: id},{...req.body })

        if(!workout){
           return res.status(404).json({error: 'No such workout'})
        }
        res.status(200).json(workout)
    
}



module.exports = {
    createWorkout,
    findWorkout,
    findWorkouts,
    deleteWorkout,
    updateWorkout
}