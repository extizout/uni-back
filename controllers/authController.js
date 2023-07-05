const Auth = require("../models/authModel");
const passport = require("passport");
const { handleErrorResponse } = require("../models/handleErrorResponse");

exports.isAuthenticated = async (req, res) => {
  const isAuthenticated = await req.isAuthenticated();
  if (isAuthenticated) {
    res.status(200).json({ isAuthenticated });
  } else {
    res.status(401).json({ isAuthenticated });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const insertId = await Auth.insertUser(
      email,
      password,
      firstName,
      lastName
    );
    if (insertId) {
      await passport.authenticate("local")(req, res, () => {
        //response with status 200, json and send session cookie by passportjs
        res.status(200).json({ message: "Successfully Registered" }).send();
      });
    }
  } catch (error) {
    handleErrorResponse(res, error, 500);
  }
};

exports.logIn = async (req, res, next) => {
  passport.authenticate("local", {
    failureMessage: true,
  })(req, res, () => {
    res.json({ user: req.user, session: req.session });
  });
};

exports.logOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      throw err;
    }
    req.session.destroy((err) => {
      if (err) throw err;
      res.status(200).json({ message: "Log out" });
    });
  });
};
