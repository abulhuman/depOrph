const { PrismaClient } = require("@prisma/client");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const history = require("connect-history-api-fallback");
const multer = require("multer");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Donor = require("./resolvers/Donor");
const Education = require("./resolvers/Education");
const Father = require("./resolvers/Father");
const Guardian = require("./resolvers/Guardian");
const Mother = require("./resolvers/Mother");
const MotherJob = require("./resolvers/MotherJob");
const Orphan = require("./resolvers/Orphan");
const SocialWorker = require("./resolvers/SocialWorker");
const District = require("./resolvers/District");
const EducationalRecord = require("./resolvers/EducationalRecord");
const FinancialRecord = require("./resolvers/FinancialRecord");
const HealthRecord = require("./resolvers/HealthRecord");
const House_property = require("./resolvers/House_property");
const OrphanPhotos = require("./resolvers/OrphanPhotos");
const PeasantAssociation = require("./resolvers/PeasantAssociation");
const SponsorshipStatus = require("./resolvers/SponsorshipStatus");
const SupportPlan = require("./resolvers/SupportPlan");

const app = express();

const prisma = new PrismaClient({
  errorFormat: "minimal"
});

const resolvers = {
  Query,
  Mutation,
  Donor,
  Education,
  Father,
  Guardian,
  Mother,
  MotherJob,
  Orphan,
  SocialWorker,
  District,
  EducationalRecord,
  FinancialRecord,
  HealthRecord,
  House_property,
  OrphanPhotos,
  PeasantAssociation,
  SponsorshipStatus,
  SupportPlan
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
    cb(null, `./public/images/${file.fieldname}/`);
    // console.log(file);
  },
  filename: function (req, file, cb) {
    // const uniquePrefix = Date.now();
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  }
});

// console.dir(storage.getDestination());

const upload = multer({ storage });

app.use(express.static("public"));

app.use(history());
app.use(cors());

app.post(
  "/public/images/orphanBirthCertificate/",
  upload.single("orphanBirthCertificate"),
  function (req, res) {
    console.dir(req.file);
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

app.listen({ port: process.env.PORT || 3000 }, () => {
  console.log(`🖥 Server ready at http://localhost:3000${server.graphqlPath} `);
});
