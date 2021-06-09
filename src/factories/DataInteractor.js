// Driving Obsolete funtions of mongodb

module.exports = function DataInteractor(model) {
  model.statics.findRecord = () => {};
  model.statics.findByIdAndUpdate = (...arg) =>
  model.findByIdAndUpdate(...arg).exec();
  model.findOneAndRemove = (...arg) => model.findOneAndRemove(...arg).exec();
  model.findByIdAndUpdate = (...arg) => model.findOneAndRemove(...arg).exec();
  return model;
};
