const corsConfig = require("../config/corsConfig");

const cors = require("cors");

const opts = {
  credentials: corsConfig.credentials,
  origin: corsConfig.origin,
};

module.exports = cors(opts);
