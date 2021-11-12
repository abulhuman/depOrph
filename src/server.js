const { PrismaClient } = require("@prisma/client");
const { ApolloServer, ApolloError } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require("apollo-server-core");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const history = require("connect-history-api-fallback");
const multer = require("multer");
const moment = require("moment");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Donor = require("./resolvers/Donor");
const Father = require("./resolvers/Father");
const Guardian = require("./resolvers/Guardian");
const Mother = require("./resolvers/Mother");
const MotherJob = require("./resolvers/MotherJob");
const Orphan = require("./resolvers/Orphan");
const SocialWorker = require("./resolvers/SocialWorker");
const Region = require("./resolvers/Region");
const Zone = require("./resolvers/Zone");
const District = require("./resolvers/District");
const Village = require("./resolvers/Village");
const EducationalRecord = require("./resolvers/EducationalRecord");
const FinancialRecord = require("./resolvers/FinancialRecord");
const OrphanDocument = require("./resolvers/OrphanDocument");
const House_property = require("./resolvers/House_property");
const OrphanPhoto = require("./resolvers/OrphanPhoto");
const HealthStatus = require("./resolvers/HealthStatus");
const SponsorshipStatus = require("./resolvers/SponsorshipStatus");
const Project = require("./resolvers/Project");
const ProjectDocument = require("./resolvers/ProjectDocument");
const IncomeGeneratingActivity = require("./resolvers/IncomeGeneratingActivity");
const IncomeGeneratingActivityPhoto = require("./resolvers/IncomeGeneratingActivityPhoto");
const Payment = require("./resolvers/Payment");
const SupportPlan = require("./resolvers/SupportPlan");
const Head = require("./resolvers/Head");
const Coordinator = require("./resolvers/Coordinator");
const User = require("./resolvers/User");

const { getUser, convertImage } = require("./utils");
const { GraphQLError } = require("graphql");

const prisma = new PrismaClient({
  errorFormat: "minimal"
});

const resolvers = {
  Query,
  Mutation,
  Donor,
  Father,
  Guardian,
  Mother,
  MotherJob,
  Orphan,
  SocialWorker,
  Region,
  Zone,
  District,
  Village,
  EducationalRecord,
  FinancialRecord,
  OrphanDocument,
  House_property,
  OrphanPhoto,
  HealthStatus,
  SponsorshipStatus,
  Project,
  ProjectDocument,
  IncomeGeneratingActivity,
  IncomeGeneratingActivityPhoto,
  Payment,
  SupportPlan,
  Head,
  Coordinator,
  User
};

/** set corsOptions to enable cors in all the endpoints and the server.applyMiddleware() */
const corsOptions = {
  credentials: true,
  origin: [
    `http://${process.env.HOSTNAME}:${process.env.PORT}`, // main node-express application server origin address
    `http://127.0.0.1:3000/`, // dev server origin address
    `http://localhost:3000/`, // dev server origin address
    "http://localhost:8080" // front-end dev server origin address
  ]
};

async function startApolloServer() {
  const app = express();

  const SESSION_SECRET = process.env.SESSION_SECRET || "r4Hxza9y3CrfYkH";

  /** use a session with a rondom string as a session
   *  secret for authentication with a cookie that
   * expires after 12 hours of being set (login),
   * then the user is required to login again
   */
  app.use(
    session({
      name: "sessionId",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 4.32e7 // 12 hours
      }
    })
  );

  /** create an ApolloServer instance to handle the graphql server */
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: ({ req, res }) => {
      return {
        req,
        res,
        prisma
      };
    },
    formatError: (error) => {
      if (error.originalError instanceof ApolloError) return error;
      return new GraphQLError(error);
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  });

  await server.start();

  /** cors: crosOptions -- enables the apollo-server-express cors with the corsOptions */
  server.applyMiddleware({ app, cors: corsOptions });

  /** start server and listen for connections using the express application */
  await new Promise((resolve) => app.listen({ port: 3000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`);

  return { server, app };

  // console.log(
  //   `💻 Server ready at http://${process.env.HOSTNAME || "localhost"}:${
  //     process.env.PORT || 3000
  //   }`,
  //   `\n⌛ Playground ready at http://${process.env.HOSTNAME || "localhost"}:${
  //     process.env.PORT || 3000
  //   }${server.graphqlPath} `
  // );
}

try {
  const ApolloServerExpress = startApolloServer();

  ApolloServerExpress.then((res) => {
    const { app } = res;

    // create file storage multer options
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `./public/images/${file.fieldname}/`);
      },
      filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.originalname}`);
      }
    });

    // create file filter function to filter files
    function fileFilter(req, file, cb) {
      /** The function should call `cb` with a boolean
       * to indicate if the file should be accepted
       *
       * To accept the file pass `true`
       * To reject this file pass `false`
       */

      try {
        /** allow uploads only for authenticated users */
        if (getUser(req).userId) {
          /** Filter files to accept only images and pdf
           *  allow uploads for files that have
           *  the extension in ["jpg", "jpeg", "bmp", "png"]
           *  all case insensetive */
          if (
            String(file.originalname).match(/.*\.(gif|jpe?g|bmp|png|pdf)$/gim)
          ) {
            cb(null, true);
          } else {
            throw new ApolloError("Unsupported image type");
          }
        } else cb(null, false);
      } catch (error) {
        /** You can always pass an error if something goes wrong */
        cb(error);
      }
    }

    /** create a multer instance to handle image uploads, and
     * pass it the storage options and the file filter function created above */
    const upload = multer({
      storage,
      fileFilter
    });

    app.use(express.static("public"));

    /** handle all routing by the front-end
     * Single Page Application (SPA, vue.js in our case)
     */
    app.use(history());

    /** post end points for image/pdf upload */
    app.post(
      "/public/images/orphanBirthCertificate/",
      cors(corsOptions),
      upload.single("orphanBirthCertificate"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/orphanIdCard/",
      cors(corsOptions),
      upload.single("orphanIdCard"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/orphanPassport/",
      cors(corsOptions),
      upload.single("orphanPassport"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/orphanOriginalThankyouLetter/",
      cors(corsOptions),
      upload.single("orphanOriginalThankyouLetter"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/orphanTranslatedThankyouLetter/",
      cors(corsOptions),
      upload.single("orphanTranslatedThankyouLetter"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/orphanPhotosPhotoPortrait/",
      cors(corsOptions),
      upload.single("orphanPhotosPhotoPortrait"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/orphanPhotosPhotoLong/",
      cors(corsOptions),
      upload.single("orphanPhotosPhotoLong"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/fatherDeathCertificate/",
      cors(corsOptions),
      upload.single("fatherDeathCertificate"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/guardianConfirmationLetter/",
      cors(corsOptions),
      upload.single("guardianConfirmationLetter"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/guardianLegalConfirmationLetter/",
      cors(corsOptions),
      upload.single("guardianLegalConfirmationLetter"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/guardianIDCard/",
      cors(corsOptions),
      upload.single("guardianIDCard"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/healthRecordMedicalCertificate/",
      cors(corsOptions),
      upload.single("healthRecordMedicalCertificate"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/educationalCertificate/",
      cors(corsOptions),
      upload.single("educationalCertificate"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/IGAPhoto/",
      cors(corsOptions),
      upload.single("IGAPhoto"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/projectDocument/",
      cors(corsOptions),
      upload.single("projectDocument"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );

    app.post(
      "/public/images/educationalRecordReportCard/",
      cors(corsOptions),
      upload.single("educationalRecordReportCard"),
      (req, res) => {
        if (req.file) {
          if (req.file.mimetype === "application/pdf") {
            convertImage(req.file.path, req.file.destination).then((data) =>
              res.send(data)
            );
          } else res.send(req.file.path);
        } else return res.send("Image not attached");
      }
    );
  }).catch((err) => {
    throw err;
  });
} catch (error) {
  console.error(error);
}

