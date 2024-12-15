const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./database.js'); // Import database connection

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

// Sign Up Route
app.post('/signup', async (req, res) => {
    const { mail, password } = req.body;
    if (!mail || !password) {
        return res.status(400).json({ error: 'Mail and password are required' });
    }
    console.log('Request body:', req.body);
    try {
        const result = await pool.query(
            'INSERT INTO users (mail, password) VALUES ($1, $2) RETURNING *',
            [mail, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE mail = $1 AND password = $2',
            [mail, password]
        );
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Fetch Posts
app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add Post
app.post('/posts', async (req, res) => {
    const { postText } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (postText) VALUES ($1) RETURNING *',
            [postText]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete All Posts
app.delete('/posts', async (req, res) => {
    try {
        await pool.query('DELETE FROM posts');
        res.status(200).json({ message: 'All posts deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// Get a single post
app.get('/posts/:id', async (req, res) => { //app.get('/posts/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        if (result.rows.length) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a post
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { postText } = req.body;
    try {
        await pool.query('UPDATE posts SET postText = $1 WHERE id = $2', [postText, id]);
        res.send("Post updated successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});
//https://stackoverflow.com/questions/60875409/node-js-express-execute-inside-app-post