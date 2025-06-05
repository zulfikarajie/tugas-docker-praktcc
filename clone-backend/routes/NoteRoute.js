const express = require("express");
const {
  createNote,
  deleteNote,
  getNote,
  updateNote,
} = require("../controller/NoteController.js");
const authenticate = require("../middleware/AuthMiddleware.js");

const router = express.Router();

router.get("/notes", authenticate, getNote);
router.post("/add-note", authenticate, createNote);
router.put("/edit-note/:id", authenticate, updateNote);
router.delete("/delete-note/:id", authenticate, deleteNote);

module.exports = router;
