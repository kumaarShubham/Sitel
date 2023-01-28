const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.json())

const UserDB = require('./models/User')

try{
    mongoose.connect('mongodb+srv://root:root@cluster0.sipbfgg.mongodb.net/User-User?retryWrites=true&w=majority', {useNewUrlParser: true})
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to database'))
}
catch(err){
    console.log('Error:', err)
}

// Create an User and a user
app.post('/', async (req, res) => {    
    try{
        let id = Math.random() * 1000
        const newUser = new UserDB({
            id: id,
            name: req.body.name,
            email: req.body.email,
            dob: req.body.dob,
        })

        const user = await newUser.save()
        res.status(201).json(user)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})


// Fetch a user
app.patch('/:id', async (req, res) => {
    try{
        const user = await UserDB.find({id: req.params.id})
        res.status(201).json(user)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})


// Delete a user
app.patch('/:id', async (req, res) => {
    try{
        const user = await UserDB.findByIdAndDelete({id: req.params.id})
        res.status(201).json(user)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})