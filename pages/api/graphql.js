/* eslint-disable import/no-anonymous-default-export */
const { graphql, buildSchema } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const { Pool } = require('pg');
require('dotenv').config();

const { goTrace } = require('../utils/trace.js');

// const { envelop, useSchema, useTiming } = require('@envelop/core');

const connectionString = process.env.DB_CONNECTION_STRING;
const pool = new Pool({connectionString});

const typeDefs = buildSchema(`
    type User {
        id: ID
        name: String
        username: String
        password: String
        email: String
        avatar_url: String
    }

    type Query {
        getUsers: [User]
        getUser(id: ID!): User
    }`);

// const getEnveloped = envelop({
//   plugins: [useSchema(typeDefs), useTiming()],
// });

// module.exports = getEnveloped;
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
          const id = args.id;
          const query = `SELECT * FROM users WHERE id = $1`;
          const users = await pool.query(query, [id]);
          return users.rows[0];
        } catch (error) {
          return error;
        }
      }
    }
  }
;

// const loggingMiddleware = async (resolve, root, args, context, info) => {
//   context.path.push(info.path.key);
//   const startTime = process.hrtime();
//   const result = await resolve(root, args, context, info);
//   const endTime = Date.now();
//   const resolverData = {
//     parentType: info.parentType,
//     fieldName: info.fieldName,
//     startTime,
//     endTime,
//     returnValue: result,
//   };
//   console.log(context.path);
//   //console.log(resolverData);
//   return result;
// }

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default async (req, res) => {
  const query = req.body.query;
  const response = await goTrace(
    schema,
    query,
  );
  return res.send(JSON.stringify(response));
};

