//Conection to the database and configuration
const mongoose = require("mongoose");

class MongoProvider {
  constructor() {
    mongoose.set("useFindAndModify", false);
    mongoose.set("debug", true);
  }

  async connect() {
    const { ok, error, result: connection } = await surePromise(
      mongoose.connect(process.env.DATABASE_URL || 'mongodb+srv://form:form08062021@cluster0.stjxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useCreateIndex: true,
        useNewUrlParser: true,
      })
    );
    if (ok) return Promise.resolve(connection);
    return Promise.reject(error);
  }
}

module.exports = MongoProvider;
