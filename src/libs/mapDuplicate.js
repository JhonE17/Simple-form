module.exports = (name) =>
  function mapDuplicate(error, _doc, next) {
    let duplicateError = error.name === "MongoError" && error.code === 11000;
    if (duplicateError) {
      let result = {
        name: "ValidationError",
        message: `${name} validation failed`,
        errors: {},
      };
      //Object.keys(this._doc) = ["email", "name", "password", ......]
      Object.keys(this._doc).forEach((path) => {
        let isDuplicate = error.errmsg.includes(`${path}_1`); //match with $email_1
        //Check if any attribute of the document is included in the error message as an unique field example:
        //11000 E11000 duplicate key error index: mydb.users.$email_1  dup key: { : "hello@gmail.com" }
        if (isDuplicate) {
          let value = this._doc[path];
          result.errors[path] = {
            name: "ValidatorError",
            kind: "unique",
            message: `Path ${path} (${value}) is not unique.`,
            path,
            value,
          };
        }
      });
      next(result);
    } else {
      next();
    }
  };
