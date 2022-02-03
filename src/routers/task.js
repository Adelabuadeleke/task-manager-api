const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()

router.post('/tasks', auth, async (req, res)=> {
  const task = new Task({
    ...req.body,
    owner:req.user._id
  })
  try {
     await task.save()
     res.status(201).send(task)

  } catch (e) {
    res.status(400).send(e)
  }
 
  
})

// GET /task?completd=true
// GET /tasks?limit=10&skip=10
// GET /task?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {
  try {
    const match = {}  
    const sort = {}

    if(req.query.completed) {
      match.completed = req.query.completed === "true"
    }

    if (req.query.sortBy){
      const parts = req.query.sortBy.split(':')
      sort[parts[0]] = parts[1] === 'desc' ? -1:1
    }

    await req.user.populate({
      path:'tasks', 
      match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
       
      }
    }).execPopulate()
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send()
    console.log(e)
  }
  
})

router.get('/tasks/:id', auth, async (req, res)=>{
  const _id = req.params.id
  try {
   
    const task = await Task.findOne({ _id, owner: req.user._id })
    if(!task) {
      return res.status(404).send()
    }
    res.send(task)
  } catch (e){
    res.status(500).send()
    console.log(e)
  }

  
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const validUpdates = ['description', 'completed']
  const isValidOperation = updates.every((updates)=>{
    return validUpdates.includes(updates)
  })

  if(!isValidOperation) {
    return res.status(400).send({error:'Invalid updates!'})
  }

    
  try {
    const task = await Task.findOne({ _id:req.params.id, owner:req.user.id })
  
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true, useFindAndModify:false})
    if(!task) {
      return res.status(404).send()
    }
      updates.forEach(async(update)=>task[update] = req.body[update])

      await task.save()
      console.log(req.user)
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }

})

router.delete('/tasks/:id', auth, async(req, res) => {
  try{
    const task = await Task.findOneAndDelete({ _id:req.params.id, owner:req.user.id })

    if(!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch (e) {
    res.status(500).send(e)
    console.log(e)
  }
})

module.exports = router