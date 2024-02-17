const express = require('express');
const { check, validationResult } = require('express-validator');

const fetchUser = require('../middlewares/auth');
const Notes = require('../models/notes');

const router = express.Router();

// Fetch all notes using : GET "/api/notes/allnotes". login required
router.get('/allnotes', fetchUser, async (req, res)=>{
    const userId = req.user._doc._id
    const allNotes = await Notes.find({ userId });
    return res.json(allNotes);
})

// Create notes using : POST "/api/notes/createnotes". login required
router.post('/createnotes', fetchUser, 
            [check('title', 'Enter a title').notEmpty(),
             check('description', "Description can't be empty").notEmpty()], async (req, res)=> {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const userId = req.user._doc._id;
    const { title, description } = req.body;

    Notes.create({
        userId, 
        title,
        description
    })
    .then((note)=>{
        return res.json(note);
    })
    .catch((err) => {
        console.log("Internal Server Error");
        res.status(500).send({
            error: "Some error occured",
            message: err.message
        })
    });

})

// Update notes using : PUT "/api/notes/updatenotes". login required
router.put('/updatenotes/:id', fetchUser, async (req, res)=> {
    const note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note not found");
    }
    if(note.userId.toString() !== req.user._doc._id){
        return res.status(401).send("Access Denied");
    }

    const { title, description } = req.body;
    const newNote = {};
    if(title){ newNote.title = title };
    if(description){ newNote.description = description };

    await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, { new: true })
    .then((note)=>{
        return res.json(note);
    })
    .catch((err) => {
        console.log("Internal Server Error");
        res.status(500).send({
            error: "Some error occured",
            message: err.message
        })
    });
})

// Delete existing note using : DELETE "/api/notes/deletenotes". login required
router.delete('/deletenotes/:id', fetchUser, async (req, res)=> {
    const note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("Note not found");
    }
    if(note.userId.toString() !== req.user._doc._id){
        return res.status(401).send("Access Denied");
    }

    await Notes.findByIdAndDelete(req.params.id)
    .then(()=>{
        return res.json({ message: "Note is Deleted"});
    })
    .catch((err) => {
        console.log("Internal Server Error");
        res.status(500).send({
            error: "Some error occured",
            message: err.message
        })
    });
})


module.exports = router;