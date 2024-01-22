const express = require('express')
const Task = require('../Models/TaskModel')
const router = express()
const validateToken = require('../validate/validateTokenRoute')
const isAdmin = require('../validate/isAdmin')

router.post('/tasks', validateToken(), isAdmin, async(req,res) => {
    try {
        
        const task = await Task.create(req.body)
        res.status(200).json(task)
        
    } catch (error) {
        console.log(error.message);
        req.status(500).json({ message: error.message})
        
    }
       
})


router.get('/tasks', validateToken(), async(req,res) => {
    try {
        const { sortBy } = req.query
        let sortCriteria = {}

        if (sortBy === 'dueDate' ) {
            sortCriteria = { dueDate: 1 }
        
        } else if (sortBy === 'status') {
            sortCriteria = { status: 1 }
        }
        
        const tasks = await Task.find().sort(sortCriteria)
        console.log(tasks);
        res.json(tasks)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error." })
    }
})
router.get('/tasks/:id', validateToken(), async(req,res) => {
    try {
        const {id} = req.params
        const task = await Task.findById(id)
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/tasks/:id', validateToken(), isAdmin, async(req,res) => {
    try {
        const {id} = req.params
        const task = await Task.findByIdAndUpdate(id, req.body)
        if (!task) {
            return res.status(404).json({message: `cannot find any tasks with ID ${id}`})
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message })
       
    }
})

router.delete('/tasks/:id',validateToken(), isAdmin, async(req,res) => {
    try {
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({message: `cannot find any tasks with ID ${id}`})
        }
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})




module.exports = router



