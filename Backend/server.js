const express = require('express'); // Import the Express framework
const mysql = require('mysql'); // Import the MySQL library
const cors = require('cors'); // Import the CORS middleware

const app = express(); // Create an Express application
app.use(cors()); // Using the CORS middleware to enable cross-origin requests
app.use(express.json()); // Using middleware to parse JSON bodies of incoming requests

// Create a MySQL database connection
const db = mysql.createConnection({
    host: 'localhost', // Database host
    user: 'root', // Database username
    password: 'W7301@jqir#', // Database password
    database: 'StdMgtSystem' // Database name
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err); // Log connection error
        return;
    }
    console.log('Connected to the MySQL database.'); // Log successful connection
});

// SQL query to create the students table if it doesn't already exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL 
    )
`;

// Execute the create table query
db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table:', err); // Log table creation error
        return;
    }
    console.log('Table created or already exists.'); // Log table creation or existence
});

// Route to get all students
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students'; // SQL query to select all students
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Handle query error
        }
        res.json(results); // Send the results as JSON
    });
});

// Route to add a new student
app.post('/students', (req, res) => {
    const { name, email } = req.body; // Extract name and email from request body
    const query = 'INSERT INTO students (name, email) VALUES (?, ?)'; // SQL query to insert a new student
    db.query(query, [name, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Handle query error
        }
        res.json({ id: result.insertId, name, email }); // Send the new student ID, name, and email as JSON
    });
});

// Route to update a student
app.put('/students/:id', (req, res) => {
    const { id } = req.params; // Extract student ID from URL parameters
    const { name, email } = req.body; // Extract name and email from request body
    const query = 'UPDATE students SET name = ?, email = ? WHERE id = ?'; // SQL query to update a student
    db.query(query, [name, email, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Handle query error
        }
        res.json({ id, name, email }); // Send the updated student ID, name, and email as JSON
    });
});

// Route to delete a student
app.delete('/students/:id', (req, res) => {
    const { id } = req.params; // Extract student ID from URL parameters
    const query = 'DELETE FROM students WHERE id = ?'; // SQL query to delete a student
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Handle query error
        }
        res.json({ id }); // Send the deleted student ID as JSON
    });
});

// Start the server
app.listen(8081, () => {
    console.log('Server is running on port 8081'); // Log that the server is running
});
