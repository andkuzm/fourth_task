// Import necessary modules
import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcrypt';


// Initialize app and middleware
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_secret_key'; // Replace with a strong secret key

app.use(bodyParser.json());

// Initialize PostgreSQL pool
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432, // Default PostgreSQL port
});

// Create tables if they don’t exist
const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      body TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

initDb().catch(err => console.error('Error initializing database:', err));

// Helper function for verifying JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
}

// Routes
// Signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );
    const token = jwt.sign({ id: result.rows[0].id, email }, SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(400).send('Error signing up');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email }, SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(400).send('Error logging in');
  }
});

// Fetch all posts
app.get('/posts', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching posts');
  }
});

// Add a post
app.post('/posts', authenticateToken, async (req, res) => {
    const { body } = req.body; // Extract post body
    try {
      const result = await pool.query(
        'INSERT INTO posts (body) VALUES ($1) RETURNING *',
        [body]
      );
      res.json(result.rows[0]); // Return the newly created post
    } catch (err) {
      console.error('Error adding post:', err);
      res.status(500).send('Error adding post');
    }
  });
  

// Delete all posts
app.delete('/posts', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM posts');
    res.send('All posts deleted');
  } catch (err) {
    res.status(500).send('Error deleting posts');
  }
});

// Fetch a single post
app.get('/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Post not found');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error fetching post');
  }
});

// Update a post
app.put('/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  try {
    const result = await pool.query(
      'UPDATE posts SET body = $1 WHERE id = $2 RETURNING *',
      [body, id]
    );
    if (result.rows.length === 0) return res.status(404).send('Post not found');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error updating post');
  }
});

// Delete a single post
app.delete('/posts/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).send('Post not found');
    res.send('Post deleted');
  } catch (err) {
    res.status(500).send('Error deleting post');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
