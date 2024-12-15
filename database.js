const {Client} = require('pg');
//const Pool = require("mysql/lib/Pool.сjs");
const client = new Client({
    user: "postgres",
    password: "1234",
    database: "webAppdb",
    host: "localhost",
    port: "5432"
});

client.connect().then(() => {
    console.log("connected")
}).catch((err) => {
    console.error(err);
});

async function initialiseDB() {
    try {
        await client.query('DROP TABLE IF EXISTS posts, users CASCADE;');

        await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        mail TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

        await client.query(`
      CREATE TABLE posts (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        postText TEXT NOT NULL
      );
    `);

        await client.query(`
      INSERT INTO posts (posttext) VALUES 
        ('testText0'), 
        ('testText1'), 
        ('testText2'), 
        ('testText3'), 
        ('testText4'), 
        ('testText5'), 
        ('testText6'), 
        ('testText7');
    `);

        await client.query(`
      INSERT INTO users (mail, password) VALUES 
        ('test@example.com', 'password123');
    `);

        const postsResult = await client.query('SELECT * FROM posts');
        const usersResult = await client.query('SELECT * FROM users');

        console.log('Posts:', postsResult.rows);
        console.log('Users:', usersResult.rows);

    } catch (err) {
        console.error('Error executing query:', err.stack);
    }
    finally {
        console.log("db initiated, client connected")
    }
}

initialiseDB().catch((err) => console.error('Error running the script:', err));


// const execute = async (query) => {
//     try {
//         const result = await client.query(query);
//         client.release();
//         return result;
//     } catch (error) {
//         console.error('Database query error:', error.stack);
//         throw error;
//     }
// };
//
// const createUsersTable = `
//     CREATE TABLE IF NOT EXISTS "users" (
//         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//         email VARCHAR(200) NOT NULL UNIQUE,
//         password VARCHAR(200) NOT NULL
//     );
// `;
//
// const createPostsTable = `
//     CREATE TABLE IF NOT EXISTS "posts" (
//         id SERIAL PRIMARY KEY,
//         date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         postText TEXT NOT NULL
//     );
// `;
//
// const setupDatabase = async () => {
//     try {
//         await execute(createUsersTable);
//         console.log('Table "users" created');
//         await execute(createPostsTable);
//         console.log('Table "posts" created');
//     } catch (error) {
//         console.error('Error setting up the database:', error.message);
//     }
// };
//setupDatabase();
module.exports = client;
