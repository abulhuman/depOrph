const { PrismaClient } = require('@prisma/client');
const { GraphQLServer } = require('graphql-yoga');
const path = require('path');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Orphan = require('./resolvers/Orphan');
const Donor = require('./resolvers/Donor');
const Education = require('./resolvers/Education');
const Father = require('./resolvers/Father');
const Guardian = require('./resolvers/Guardian');
const Iga_property = require('./resolvers/Iga_property');
const Mother = require('./resolvers/Mother');
const MotherJob = require('./resolvers/MotherJob');
const Sibling = require('./resolvers/Sibling');
const SocialWorker = require('./resolvers/SocialWorker');
const SponsoredGroup = require('./resolvers/SponsoredGroup');
const RegisteredGroup = require('./resolvers/RegisteredGroup');

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

const resolvers = {
  Query,
  Mutation,
  Orphan,
  Donor,
  Education,
  Father,
  Guardian,
  Iga_property,
  Mother,
  MotherJob,
  Sibling,
  SocialWorker,
  RegisteredGroup,
  SponsoredGroup,
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
server.createHttpServer({cors:true})
const express = server.express;

express.get('/images/:id', (req, res) => {
  console.log(`Hello Number ${req.params.id}`)
  res.sendFile(path.join(__dirname, 'public', 'powerfulFiles.PNG'));
})

server.start({ port: 5005 }, ({ port }) => {
  console.log(`\n\nServer is running on port ${port} ... \n\n`);
});
