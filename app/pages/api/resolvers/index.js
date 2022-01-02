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
      },
      getEntries: async (root, args, context, info) => {
        try {
          const userid = args.userid;
          const query = `SELECT * FROM entries WHERE userid = $1`;
          const entries = await pool.query(query, [userid]);
          return entries.rows;
        } catch (error) {
          return error;
        }
      },
      getEntry: async (root, args, context, info) => {
        try {
          const id = args.id;
          const query = `SELECT * FROM entries WHERE id=$1 LIMIT 1`;
          const entry = await pool.query(query, [id])
            .then(res => res.rows[0])
          return entry;
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
            message: 'User created successfully.'
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

            return {
              user_id: user.id,
              firstname: user.firstname,
              authorized: true,
              message: 'User logged in successfully.'
            }
          } else {
            return {
              authorized: false,
              message: 'Invalid username or password.'
            }
          }
        } catch (error) {
          return {
            authorized: false,
            message: error.message
          };
        }
      },
      addEntry: async (root, args, context, info) => {
        const { entry } = args;
        try {
          const query = `INSERT INTO entries (id, userid, favorited, origin_name, price, roaster, producer, roast_date, variety, process, rating, notes, brew_method, taste_tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
          const res = await pool.query(query, [entry.id, entry.userid, entry.favorited, entry.origin_name, entry.price, entry.roaster, entry.producer, entry.roast_date, entry.variety, entry.process, entry.rating, entry.notes, entry.brew_method, entry.taste_tags]);

          return {
            validation: true,
            message: 'Entry added successfully'
          }
        } catch(err) {
          return {
            validation: false,
            message: err.message
          }
        }
      },
      updateEntry: async (root, args, context, info) => {
        const { entry } = args;
        try {
          const query = `UPDATE entries SET favorited = $1, origin_name = $2, price = $3, roaster = $4, producer = $5, roast_date = $6, variety = $7, process = $8, rating = $9, notes = $10, brew_method = $11, taste_tags = $12 WHERE id = $13`;
          const res = await pool.query(query, [entry.favorited, entry.origin_name, entry.price, entry.roaster, entry.producer, entry.roast_date, entry.variety, entry.process, entry.rating, entry.notes, entry.brew_method, entry.taste_tags, entry.id]);
          
          return {
            validation: true,
            message: 'Entry updated successfully'
          }

        } catch(err) {
          return {
            validation: false,
            message: err.message
          }
        }
      },
      deleteEntry: async (root, args, context, info) => {
        const { id } = args;
        try {
          const query = `DELETE FROM entries WHERE id = $1`;
          await pool.query(query, [id]);
          return {
            validation: true,
            message: 'Entry deleted successfully'
          }
        } catch(err) {
          return {
            validation: false,
            message: err.message
          }
        }
      },
    }
  };