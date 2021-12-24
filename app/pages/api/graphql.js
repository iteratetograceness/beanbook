/* eslint-disable import/no-anonymous-default-export */
const { graphql, buildSchema } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
import jwt from 'jsonwebtoken'
import { compareSync, hashSync } from 'bcrypt'
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;
const pool = new Pool({connectionString});

const typeDefs = buildSchema(`
    type User {
        id: ID!
        firstname: String!
        lastname: String!
        username: String!
        password: String!
        email: String! 
        avatar_url: String
    }

    type AuthToken {
      token: String!
    }

    type Query {
        getUsers: [User]
        getUser(username: String!): User!
    }
    
    type Mutation {
      signup(id: ID!, firstname: String!, lastname: String!, username: String!, password: String!, email: String!, avatar_url: String): Boolean
      login(username: String!, password: String!): AuthToken
    }`
    );

const resolvers = 
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
          const query = `INSERT INTO users (id, firstname, lastname, username, password, email, avatar_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
          const users = await pool.query(query, [args.id, args.firstname, args.lastname, args.username, args.password, args.email, args.avatar_url]);
          //const { id, username } = users.rows[0];
          return true
        } catch (error) {
          return error;
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
              username: user.username,
              email: user.email,
              avatar_url: user.avatar_url
            }, process.env.JWT_SECRET);
            return {
              token
            }
          } else {
            return {
              error: 'Invalid username/password'
            }
          }
        } catch (error) {
          return error;
        }
      }
    }
  }
;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default async (req, res) => {
  const query = req.body.query;
  const response = await graphql(
    schema,
    query,
    null,
    null,
    req.body.variables,
  );
  return res.send(JSON.stringify(response));
};