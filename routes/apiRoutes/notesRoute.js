const router = require("express").Router();
const { notes } = require("../../db/db.json");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

function createNewNote(body, notes) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify({ notes }, null, 2)
  );
  return note;
}

function deleteNote(id, notes) {
  let status = false;
  let i = 0;
  while (i < notes.length || !status) {
    if (notes[i].id === id) {
      notes.splice(i, 1);
      status = true;
      fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify({ notes }, null, 2)
      );
    } else {
      i++;
    }
  }
}

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  req.body.id = uuidv4();
  let note = createNewNote(req.body, notes);
  res.json(notes);
});

router.delete("/notes/:id", (req, res) => {
  let id = req.params.id;
  deleteNote(id, notes);
  res.json(notes)
});

module.exports = router;
