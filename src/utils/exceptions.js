// Exceptions

module.exports = {
  ALREADY_EXISTS: {
    message: "user already exists",
    code: "ALREADY_EXISTS",
  },
  FAIL_GET_USER_BY_CC: {
    message: "fail finding user by cc",
    code: "FAIL_GET_USER_BY_CC",
  },
  FAIL_CREATE_USER: {
    message: "fail creating user",
    code: "FAIL_CREATE_USER",
  },
  INVALID_FIELD: {
    message: "has invalid field",
    code: "INVALID_FIELD",
  },
  EXISTS_DATA: {
    message: "Exist data",
    code: "invalidExistData",
  },
  SERVER_ERROR: {
    message: "Server error",
  },
};
