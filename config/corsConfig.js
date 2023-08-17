require("dotenv").config();

//Convert env variable string to boolean.
const credentialParsed = process.env.CORS_CREDENTIAL_OPT === "true";
const whitelistOrigins = process.env.CORS_ORIGIN_OPT;
let allowOrigins = whitelistOrigins || "http://localhost:5173";
//Split string to be array if env.CORS_ORIGIN_OPT exist
if (whitelistOrigins) {
  allowOrigins = whitelistOrigins.split(",");
}

console.log("allow-origins:", allowOrigins);

module.exports = {
  credentials: credentialParsed ? true : false,
  origin: allowOrigins,
};
