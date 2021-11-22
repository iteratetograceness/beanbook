/* eslint-disable import/no-anonymous-default-export */
import { graphql, buildSchema } from 'graphql';
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;
const pool = new Pool({connectionString});

const schema = buildSchema(`
    type  User {
        id: ID
        name: String
        username: String
        password: String
        email: String
        avatar_url: String
    }

    type  Query {
        getUsers: [User]
    }`);

const root = 
  {
    getUsers: async () => {
      try {
        const query = `SELECT * FROM users`;
        const users = await pool.query(query);
        return users.rows;
      } catch (error) {
        return error;
      }
    }
  }
;

export default async (req: any, res: any) => {
  const query = req.body.query;
  const response = await graphql(schema, query, root);
  console.log(response);
  return res.send(JSON.stringify(response));
};

