const fs = require("fs");
const path = require("path");
const db = require("../db/db.json")


const updateDb = (notes) => {
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes))
}

const readNotes = () => {
    const notes = fs.readFileSync(path.join(__dirname, "../db/db.json"))
    return JSON.parse(notes)
}
module.exports = app => {


    // const notes =JSON.parse(data);

    app.get("/api/notes", (req, res) => {
        const notes = readNotes();
        res.json(notes);
    });

    app.post("/api/notes", (req, res) => {
        const notes = readNotes();

        let { title, text } = req.body
        let note = { title, text, id: Math.floor(Math.random() * 1000) };
        notes.push(note);
        updateDb(notes);
        res.sendStatus(200)
    });

    app.delete('/api/notes/:id', (req, res) => {
        console.log("delete route");
        const noteId = parseInt(req.params.id);
        const notes = readNotes();
        console.log(notes);
        const updatedNotes = notes.filter(note => note.id !== noteId)
        console.log(updatedNotes);
        updateDb(updatedNotes);
        res.json(updatedNotes)
    })

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });




}