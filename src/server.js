const { PrismaClient } = require('@prisma/client');
const { GraphQLServer } = require('graphql-yoga');
const express = require('express');
const path = require('path');
const multer = require('multer');
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
const Site = require('./resolvers/Site');

// tring sth
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
  Site,
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

// create file storage middleware to handle image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/images/${file.fieldname}`)
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniquePrefix}-${file.originalname}`);
  }
});

const upload = multer({ storage });

server.createHttpServer({
  cors:true,
  subscriptions: false
})

const app = server.express;

app.use(express.static('public'));

app.post('/public/images/orphanBirthCertificate/', upload.single('orphanBirthCertificate'), function(req, res) {
    return res.send(req.file.path);
  })
app.post('/public/images/orphanPhotoPortrait/', upload.single('orphanPhotoPortrait'), function(req, res) {
    return res.send(req.file.path);
  })

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
