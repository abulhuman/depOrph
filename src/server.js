const { PrismaClient } = require('@prisma/client');
const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Orphan = require('./resolvers/Orphan');

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

const resolvers = {
  Query,
  Mutation,
  Orphan,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start({ port: 5005 }, ({ port }) => {
  console.log(`\n\nServer is running on port ${port} ... \n\n`);
});
