const { PrismaClient } = require("@prisma/client");
const { ApolloServer, ApolloError } = require("apollo-server-express");
const express = require("express");
const session = require("express-session");
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
const Region = require("./resolvers/Region");
const Zone = require("./resolvers/Zone");
const District = require("./resolvers/District");
const Village = require("./resolvers/Village");
const EducationalRecord = require("./resolvers/EducationalRecord");
const FinancialRecord = require("./resolvers/FinancialRecord");
const HealthRecord = require("./resolvers/HealthRecord");
const House_property = require("./resolvers/House_property");
const OrphanPhotos = require("./resolvers/OrphanPhotos");
const SponsorshipStatus = require("./resolvers/SponsorshipStatus");
const SupportPlan = require("./resolvers/SupportPlan");
const Head = require("./resolvers/Head");
const Coordinator = require("./resolvers/Coordinator");
const User = require("./resolvers/User");

const { getUser } = require("./utils");

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
  Region,
  Zone,
  District,
  Village,
  EducationalRecord,
  FinancialRecord,
  HealthRecord,
  House_property,
  OrphanPhotos,
  SponsorshipStatus,
  SupportPlan,
  Head,
  Coordinator,
  User
};

/** create an ApolloServer instance to handle the graphql server */
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      req,
      prisma
    };
  }
});

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
      if (String(file.originalname).match(/.*\.(gif|jpe?g|bmp|png)$/gim)) {
        /** TODO add `pdf` to file extension list if it was decided to */
        cb(null, true);
      } else {
        throw new ApolloError("Unsupported image type");
      }
    } else cb(null, false);
  } catch (error) {
    /** You can always pass an error if something goes wrong */
    cb(error);
  }
};

/** create a multer instance to handle image uploads, and
 * pass it the storage options and the file filter function created above */
const upload = multer({
  storage,
  fileFilter
});

app.use(express.static("public"));

/** enable cors using the cors() express middleware */
app.use(
  cors({
    credentials: true,
    origin: [
      `http://${process.env.HOSTNAME}:${process.env.PORT}`, // main node-express application server origin address
      `http://localhost:3000/`, // dev server origin address
      `http://127.0.0.1:3000/` // dev server origin address
    ]
  })
);

/** cors: false -- disables the apollo-server-express cors to allow the cors() middleware use*/
server.applyMiddleware({ app, cors: false });

/** handle all routing by the front-end
 * Single Page Application (SPA, vue.js in our case)
 */
app.use(history());

/** post end points for image/pdf upload */
app.post(
  "/public/images/orphanBirthCertificate/",
  upload.single("orphanBirthCertificate"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/orphanIdCard/",
  upload.single("orphanIdCard"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/orphanPassport/",
  upload.single("orphanPassport"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/orphanThankyouLetter/",
  upload.single("orphanThankyouLetter"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/orphanPhotosPhotoPortrait/",
  upload.single("orphanPhotosPhotoPortrait"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

app.post(
  "/public/images/orphanPhotosLongPortrait/",
  upload.single("orphanPhotosLongPortrait"),
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
  "/public/images/guardianLegalConfirmationLetter/",
  upload.single("guardianLegalConfirmationLetter"),
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

app.post(
  "/public/images/healthRecordMedicalCertificate/",
  upload.single("healthRecordMedicalCertificate"),
  function (req, res) {
    return res.send(req.file.path);
  }
);

/** start server and listen for connections using the express application */
app.listen(
  {
    port: process.env.PORT || 3000,
    hostname: process.env.HOSTNAME || "127.0.0.1"
  },
  () => {
    console.log(
      `💻 Server ready at http://${process.env.HOSTNAME}:${
        process.env.PORT || 3000
      }`,
      `\n⌛ Playground ready at http://${process.env.HOSTNAME}:${
        process.env.PORT || 3000
      }${server.graphqlPath} `
    );
  }
);
