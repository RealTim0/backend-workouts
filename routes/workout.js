const express = require('express')
const {
    createWorkout,
    findWorkout,
    findWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workout')
const requireAuth = require("../middleware/reqAuth")

const router = express.Router()
router.use(requireAuth)

router.get('/', findWorkouts)
router.get('/:id', findWorkout)
router.post('/', createWorkout)
router.patch('/:id', updateWorkout)
router.delete('/:id',deleteWorkout)

module.exports = router