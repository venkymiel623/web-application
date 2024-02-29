// server.js

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const path = require('path');

// Set view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
// Serve static files from the 'public' directory
app.use(express.static(__dirname));

// Route to handle POST requests to /submit
app.post('/submit', (req, res) => {
    // Extract form data from request body
    const { username, email, phone, degree, graduationYear, itExperience } = req.body;
    
    // Insert the form data into the database
    const query = 'INSERT INTO users (username, email, phone, degree, graduationYear, itExperience) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [username, email, phone, degree, graduationYear, itExperience], (error, results, fields) => {
        if (error) {
            console.error('Error saving data to database:', error);
            res.status(500).send('Error saving data to database');
            return;
        }
        res.send('Data saved successfully');
    });
});
// Middleware
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({
//    secret: 'your-secret-key',
//    resave: false,
//    saveUninitialized: true
//}));

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'mysql-user',
    password: 'Mysql@123',
    database: 'mydatabase'
});

connection.connect();

// Authentication Middleware
const requireAuth = (req, res, next) => {
    if (req.session && req.session.admin) {
        return next();
    } else {
        return res.redirect('/admin/login');
    }
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin/login', (req, res) => {
    res.sendFile(__dirname + '/admin/login.html');
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    // Authenticate user (e.g., check against a database)
    if (username === 'admin' && password === 'admin123') {
        req.session.admin = true;
        res.redirect('/admin/dashboard');
    } else {
        res.redirect('/admin/login');
    }
});

app.get('/admin/dashboard', requireAuth, (req, res) => {
    // Retrieve user data from the database and render admin dashboard
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            console.error('Error retrieving data:', error);
            res.status(500).send('Error retrieving data');
            return;
        }
        res.render('admin/dashboard', { users: results });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
