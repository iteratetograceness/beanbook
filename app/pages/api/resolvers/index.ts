import axios from "axios";
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;
const pool = new Pool({connectionString});

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const query = `SELECT * FROM users`;
        const users = await pool.query(query);
        console.log(users);
        return {
          users: users.rows
        };
      } catch (error) {
        throw error;
      }
    }
  }
};

module.exports = resolvers;