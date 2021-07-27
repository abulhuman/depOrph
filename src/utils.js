const { ApolloError } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
// const pdf = require('pdf-poppler');
// ! // TODO implement pdf conversion on a linux supported pdf-library

function convertImage(pdfPath, outDir) {
  let conversionOptions = {
    format: "png", // destination file format
    out_dir: outDir, // destination directory
    out_prefix: path.basename(pdfPath, path.extname(pdfPath)), // destination filename prefix
    page: 1, // which page from the source file to convert
    scale: 2048 // quality of the destination file
  };

  return pdf
    .convert(pdfPath, conversionOptions) // convert image with the specified options
    .then(() => {
      // delete the pdf file after the converted file has been saved
      fs.unlinkSync(pdfPath);

      // destination file is saved as `[coversionOptions.out_prefix]-1.[conversionOptions.format]`
      // we need to save it as `[coversionOptions.out_prefix].[conversionOptions.format]`
      // get the name of the destination file (png file format)
      const convertedPdfFileName = findConvertedFileName(
        conversionOptions.out_dir,
        conversionOptions.out_prefix
      );

      // set path of the destination file
      const oldPngPath = path.join(
        conversionOptions.out_dir,
        convertedPdfFileName
      );

      // get file path with the desired format
      const newPngPath = getNewPngPath(oldPngPath);

      // rename the desination file with the desired name
      fs.renameSync(oldPngPath, newPngPath);


      // return the desired name
      return newPngPath;
    })
    .catch((err) => {
      console.log("an error has occurred in the pdf converter " + err);
    });
}

/**
 * Looks for a file that is inside @param outDir that starts with @param outPrefix
 * @param {*} outDir path in which files are searched
 * @param {string} outPrefix beginning of filename that we are looking for
 * @returns {string} filename of matching string
 */
function findConvertedFileName(outDir, outPrefix) {
  const files = fs.readdirSync(outDir);
  let found;
  files.forEach((file) => {
    if (file.startsWith(outPrefix)) found = file;
  });

  return found;
}

/**
 *
 * @param {string} oldPngPath path string for filename to be manipulated
 * @returns {string} path string of the original pdf's format but with png extension i.e, `Date-originalFilename.png`
 */
function getNewPngPath(oldPngPath) {
  return `${oldPngPath.substring(
    0,
    oldPngPath.indexOf(oldPngPath.match(/-([0-9]{0,20}\.(png))$/gim)[0])
  )}.png`;
}

async function updateImage(
  prisma,
  id,
  newImageUrl = undefined,
  imageName,
  entity
) {
  if (newImageUrl !== undefined) {
    // get the previous entity's details
    const previousEntity = await prisma[entity].findUnique({ where: { id } });
    // check if previous entity exists
    if (previousEntity) {
      const previousImageUrl = previousEntity[imageName] || "";
      // return if the previous Image Url doesn't exist
      if (!previousImageUrl) return;
      // check if the new Image exists sync
      try {
        if (fs.statSync(newImageUrl)) {
          // new file exists
          // check if the file url has changed
          if (previousImageUrl !== newImageUrl) {
            try {
              // check if previous image exists
              if (fs.statSync(previousImageUrl)) {
                // previous file exist delete it!
                try {
                  // delete the previous file
                  if (fs.unlinkSync(previousEntity[imageName]))
                    console.log("File Deleted Successfully");
                } catch (error) {
                  // file deletion error, throw it
                  throw new ApolloError(error);
                }
              }
            } catch (error) {
              // previous file doesn't exist, throw error
              if (error.code === "ENOENT") {
                throw new ApolloError(
                  `file ${previousImageUrl} not found`,
                  `FILE_NOT_FOUND`
                );
              } else throw new ApolloError(error);
            }
          } else throw new ApolloError(`File URL Is The Same [FILE_UNCHANGED]`);
        }
      } catch (error) {
        // new file doesn't exist, throw error
        if (error.code === "ENOENT") {
          throw new ApolloError(
            `file '${newImageUrl}' not found`,
            `FILE_NOT_FOUND`
          );
        } else throw new ApolloError(error);
      }
    } else
      throw new ApolloError(
        `${entity} with id ${id} doesn't exist`,
        `ENTITY_DOSEN'T_EXIST`
      );
  }
}

function getUser(req) {
  if (req.session.userId) {
    return {
      userId: req.session.userId,
      userRole: req.session.userRole
    };
  }
  throw new AuthenticationError();
}

class AuthenticationError extends ApolloError {
  constructor() {
    super("Not Authenticated");
  }
}

class AuthorizationError extends ApolloError {
  constructor() {
    super("Not Authorized");
  }
}

module.exports = {
  getUser,
  updateImage,
  convertImage,
  AuthenticationError,
  AuthorizationError
};
