const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const pool = require('./database.js'); // Import database connection

const app = express();
const port = 5000;
const JWT_SECRET_KEY = "1234567890";
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (mail, password) VALUES ($1, $2) RETURNING *',
            [mail, hashedPassword]
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
            'SELECT * FROM users WHERE mail = $1',
            [mail]
        );
        if (result.rows.length > 0) {
            const isMatch = await bcrypt.compare(password, result.rows[0].password);
            if(!isMatch) {res.status(401).json({ error: 'Invalid credentials' });}
            else {
                const token = jwt.sign(
                    {id: result.rows[0].id, mail: mail},
                    JWT_SECRET_KEY,
                    {expiresIn: '1h'}
                );
                res.status(200).json({ token: token });
            }
        } else {
            res.status(401).json({ error: 'Invalid credentials or account not created' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Fetch Posts
app.get('/posts', validateToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add Post
app.post('/posts', validateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'INSERT INTO posts (postText) VALUES ($1) RETURNING *',
            [req.body.posttext]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete All Posts
app.delete('/posts', validateToken, async (req, res) => {
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
app.get('/posts/:id', validateToken, async (req, res) => { //app.get('/posts/:id', verifyToken, async (req, res) => {
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
app.put('/posts/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE posts SET posttext = $1 WHERE id = $2', [req.body.body, id]);
        res.send("Post updated successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

function validateToken(req, res, next) {
    console.log('Authorization Header:', req.headers['authorization']);  // Debugging line
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded;
        next();
    });
}
// Delete a single post
app.delete('/posts/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length) {
            res.status(200).json({ message: `Post with id ${id} deleted successfully`});
        } else {
            res.status(404).json({ error: `Post with id ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//https://stackoverflow.com/questions/60875409/node-js-express-execute-inside-app-post