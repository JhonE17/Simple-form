module.exports = (Provider) =>
  class DataProvider extends Provider {
    async initialize(callback) {
      const { error: connectException, result: connection } = await surePromise(
        this.connect()
      );
      if (callback) {
        if (connectException) return callback(null, connectException);
        return callback(connection);
      }
      return null;
    }
  };
