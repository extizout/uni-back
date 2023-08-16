require("dotenv").config();

//Convert env variable string to boolean.
const credentialParsed = process.env.CORS_CREDENTIAL_OPT === "true";
//Split string to be array
const allowedOrigins = process.env.CORS_ORIGIN_OPT;
const originsSplited = allowedOrigins.split(",");
console.log("allow-origins: ", originsSplited);

module.exports = {
  credentials: credentialParsed ? true : false,
  origin: originsSplited || "http://localhost:5173",
};
