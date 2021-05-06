const { ApolloError } = require("apollo-server-express");
const fs = require("fs");

async function updateImage(
  prisma,
  id,
  newImageUrl = undefined,
  imageName,
  entity
) {
  if (newImageUrl !== undefined) {
    // get the preiuos entity's details
    const previousEntity = await prisma[entity].findUnique({ where: { id } });
    // check if previous entity exists
    if (previousEntity) {
      // check if the new Image exists sync
      try {
        if (fs.statSync(newImageUrl)) {
          // new file exists
          // check if the file url has changed
          if (previousEntity[imageName] !== newImageUrl) {
            try {
              // check if previous image exists
              if (fs.statSync(previousEntity[imageName])) {
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
                  `file ${previousEntity[imageName]}} not found`,
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
    } else throw new ApolloError(`${entity} with id ${id} doesn't exist`,`ENTITY_DOSEN'T_EXIST`)
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
  AuthenticationError,
  AuthorizationError
};
