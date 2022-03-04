const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3001;
let currentNotesRaw;

fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    currentNotesRaw = data;
  })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// loads notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
// brings in the database
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);
//save note
app.post("/api/notes", (req, res) => {
  console.log(currentNotesRaw)
  const currentNotes = JSON.parse(currentNotesRaw);
  currentNotes.push(req.body);
  fs.writeFile('./db/db.json', JSON.stringify(currentNotes), err =>
  err
  ? console.error(err)
  : console.log(
      `A new note has been added to the database`
    )
  )
  res.send(req.body)
});

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
