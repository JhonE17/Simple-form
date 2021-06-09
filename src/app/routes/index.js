const router = require("express").Router();
require("./forms")(router);


module.exports = router.use((_req, _res, next) => next());
