const { PrismaClient } = require("@prisma/client");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const history = require("connect-history-api-fallback");
const multer = require("multer");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Orphan = require("./resolvers/Orphan");
const Donor = require("./resolvers/Donor");
const Education = require("./resolvers/Education");
const Father = require("./resolvers/Father");
const Guardian = require("./resolvers/Guardian");
const Iga_property = require("./resolvers/Iga_property");
const Mother = require("./resolvers/Mother");
const MotherJob = require("./resolvers/MotherJob");
const Sibling = require("./resolvers/Sibling");
const SocialWorker = require("./resolvers/SocialWorker");
const SponsoredGroup = require("./resolvers/SponsoredGroup");
const Site = require("./resolvers/Site");

const app = express();

const prisma = new PrismaClient({
  errorFormat: "pretty"
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
  SponsoredGroup
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma
    };
  }
});

// create express middleware
server.applyMiddleware({ app });

// create file storage middleware to handle image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/images/${file.fieldname}`);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  }
});

const upload = multer({ storage });

app.use( express.static("public") );

app.use(history());
app.use(cors());

app.post(
  "/public/images/orphanBirthCertificate/",
  upload.single("orphanBirthCertificate"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/orphanPhotoPortrait/",
  upload.single("orphanPhotoPortrait"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/fatherDeathCertificate/",
  upload.single("fatherDeathCertificate"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/guardianConfirmationLetter/",
  upload.single("guardianConfirmationLetter"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/guardianIDCard/",
  upload.single("guardianIDCard"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🖥 Server ready at http://localhost:4000${server.graphqlPath}🖥🖥🖥`);
}
);
