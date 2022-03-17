/* eslint-disable no-console */
const { ApolloServer } = require("apollo-server");

const { resolvers } = require("./resolvers");
const { typeDefs } = require("./types");

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  try {
    const { url } = await server.listen({ port: process.env.PORT || 4000 });
    console.log(`API running at: ${url} :)`);
  } catch (error) {
    console.error(error);
  }
};

startServer();
