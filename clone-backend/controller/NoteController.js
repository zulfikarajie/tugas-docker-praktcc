const db = require("../config/database");

const getNote = (req, res) => {
  db.query("SELECT * FROM note_dbs ORDER BY createdAt DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

const createNote = (req, res) => {
  const { date, title, message, author } = req.body;
  const createdAt = new Date();
  const updatedAt = createdAt;

  db.query(
    "INSERT INTO note_dbs (date, title, message, author, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
    [date, title, message, author, createdAt, updatedAt],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ msg: "Note created successfully", id: result.insertId });
    }
  );
};

// UPDATE NOTE
const updateNote = (req, res) => {
  const { id } = req.params;
  const { date, title, message, author } = req.body;
  const updatedAt = new Date();

  db.query("SELECT * FROM note_dbs WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ msg: "Note not found!" });
    }

    db.query(
      "UPDATE note_dbs SET date = ?, title = ?, message = ?, author = ?, updatedAt = ? WHERE id = ?",
      [date, title, message, author, updatedAt, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ msg: "Note updated successfully" });
      }
    );
  });
};

// DELETE NOTE
const deleteNote = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM note_dbs WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ msg: "Note not found!" });
    }

    db.query("DELETE FROM note_dbs WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ msg: "Note deleted successfully" });
    });
  });
};

module.exports = { getNote, createNote, updateNote, deleteNote };
