const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",         
    password: "password",    
    database: "database",      
    host: "localhost",        
    port: "5432"            
});

const execute = async (query) => {
    try {
        const client = await pool.connect(); 
        const result = await client.query(query); 
        client.release(); 
        return result;
    } catch (error) {
        console.error('Database query error:', error.stack);
        throw error;
    }
};

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL
    );
`;

const createPostsTable = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        postText TEXT NOT NULL
    );
`;

const setupDatabase = async () => {
    try {
        await execute(createUsersTable);
        console.log('Table "users" created');
        await execute(createPostsTable);
        console.log('Table "posts" created');
    } catch (error) {
        console.error('Error setting up the database:', error.message);
    }
};

setupDatabase();

module.exports = pool;
