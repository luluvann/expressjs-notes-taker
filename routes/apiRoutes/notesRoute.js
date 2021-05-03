const router = require('express').Router();
const { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 


function createNewNote(body, notes) {
    const zookeeper = body;
    notes.push(zookeeper);
    fs.writeFileSync(
      path.join(__dirname, '../../db/db.json'),
      JSON.stringify({ notes }, null, 2)
    );
    return zookeeper;
  }
  

router.get('/notes', (req,res)=>{
    res.json(notes);
})

router.post('/notes', (req,res) =>{
    req.body.id = notes.length.toString();
    let note = createNewNote(req.body,notes)
    res.json(notes)
})

module.exports = router;