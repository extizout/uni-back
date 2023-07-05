require("dotenv").config();
const express = require("express");
const db = require("../config/dbConfig");
const Middleware = express.Router();

//Model
const { verifyStrategy } = require("../models/authModel");
const { getUserById } = require("../models/userModel");

//Auth
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

//Custom key values that receive from form values
const customField = {
  usernameField: "email",
  passwordField: "password",
};

const sessionStore = new MySQLStore({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.databaseSession,
  clearExpired: true,
  checkExpirationInterval: 900000,
});

console.log("authMiddleware starting to load...");
Middleware.use(
  session({
    name: db.sessionName,
    key: db.sessionKey,
    secret: db.sessionSecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: db.cookieMaxAge,
    },
  })
);

sessionStore.clear().then(() => {
  console.log("sessions Store is clear.");
});

Middleware.use(passport.authenticate("session"));

passport.use(new LocalStrategy(customField, verifyStrategy));

passport.serializeUser(async function (user, cb) {
  console.log("-------> Serialize ");
  console.log("serialize User: " + JSON.stringify(user));
  cb(null, user.User_Id);
});

passport.deserializeUser(async function (userId, cb) {
  console.log("-------> Deserialize ");
  console.log("deserialize User: " + JSON.stringify(userId));

  const [result] = await getUserById(userId);

  cb(null, result);
});

Middleware.use(passport.initialize());
Middleware.use(passport.session());

console.log("PassportJS authMiddleware accessed.");
module.exports = Middleware;
