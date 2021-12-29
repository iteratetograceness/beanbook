import jwt from 'jsonwebtoken'
import { compareSync, hashSync } from 'bcrypt'
const { Pool } = require('pg');

const connectionString = process.env.DB_CONNECTION_STRING;
const pool = new Pool({connectionString});

export const resolvers = 
  { 
    Query: {
      getUsers: async (root, args, context, info) => {
        try {
          const query = `SELECT * FROM users`;
          const users = await pool.query(query);
          return users.rows;
        } catch (error) {
          return error;
        }
      },
      getUser: async (root, args, context, info) => {
        try {
          const username = args.username;
          const query = `SELECT * FROM users WHERE username = $1`;
          const users = await pool.query(query, [username]);
          return users.rows[0];
        } catch (error) {
          return error;
        }
      }
    },
    Mutation: {
      signup: async (root, args, context, info) => {
        args.password = hashSync(args.password, 10);
        try {
          const query = `INSERT INTO users (id, firstname, lastname, username, password, email) VALUES ($1, $2, $3, $4, $5, $6)`;
          await pool.query(query, [args.id, args.firstname, args.lastname, args.username, args.password, args.email]);
          return {
            validation: true,
          }
        } catch (error) {
          return {
            validation: false,
            message: error.message
          };
        }
      },
      login: async (root, args, context, info) => {
        try {
          const query = `SELECT * FROM users WHERE username = $1`;
          const users = await pool.query(query, [args.username]);
          const user = users.rows[0];
          if (user && compareSync(args.password, user.password)) {
            const token = jwt.sign({
              id: user.id,
              firstname: user.firstname,
              username: user.username
            }, process.env.JWT_SECRET);

            return {
              token
            }
          } else {
            return {
              token: 'invalid'
            }
          }
        } catch (error) {
          return error;
        }
      }
    }
  };