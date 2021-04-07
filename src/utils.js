const { ApolloError } = require("apollo-server-express");

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
    AuthenticationError,
    AuthorizationError
}
