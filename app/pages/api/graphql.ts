import { PageConfig } from "next";
import Cors from "micro-cors";
import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const context = ({ req }: { req: any }) => {
  return {
    token: req.headers.authorization
  }
}

const cors = Cors();

const server = new ApolloServer({ typeDefs, resolvers, context });

const startServer = server.start();

export default cors(async (req, res) => { 

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});

export const config: PageConfig =  {
  api: {
    bodyParser: false
  }
};