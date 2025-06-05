const express = require("express");
const cors = require("cors");
const NoteRoutes = require("./routes/NoteRoute");
const authRoutes = require("./routes/AuthRoute");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", NoteRoutes);
app.use("/", authRoutes);

app.listen(5000, () => console.log("server terhubung"));
