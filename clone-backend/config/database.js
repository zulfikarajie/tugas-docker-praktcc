const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "23.251.159.220",
  user: "root",
  password: "",
  database: "tugas2-123220035",
});

module.exports = db;
