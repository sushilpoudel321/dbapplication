const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const dbPath = path.join(__dirname, 'database.db');

// Create and open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Database opened successfully");
  }
});

// Create the table if it does not exist
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, age INTEGER)");
});

// Enable parsing of JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CRUD operations:

// CREATE - Add new user
app.post('/add-user', (req, res) => {
  const { name, email, age } = req.body;
  const stmt = db.prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");
  stmt.run(name, email, age, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'User added successfully', id: this.lastID });
    }
  });
  stmt.finalize();
});

// READ - Get all users
app.get('/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// DELETE - Delete user by ID
app.delete('/delete-user/:id', (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM users WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: `User with ID ${id} deleted successfully` });
    }
  });
});

// Server setup
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
