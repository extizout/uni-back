const Auth = require("../models/authModel");
const passport = require("passport");
const { handleErrorResponse } = require("../models/handleErrorResponse");

// Database user Table
// - user_id
// - email
// - hashed_password
// - first_name
// - last_name
// - sex
// - role
// - create_at
function extractUserModel(req) {
  const userModel = {
    userId: req.user.user_id,
    email: req.user.email,
    firstName: req.user.first_name,
    lastName: req.user.last_name,
    sex: req.user.sex,
    role: req.user.role,
    createDate: req.user.create_at,
  };
  return userModel;
}

exports.isAuthenticated = async (req, res) => {
  const isAuthenticated = await req.isAuthenticated();
  if (isAuthenticated) {
    res.status(200).json({ isAuthenticated });
  } else {
    res.status(401).json({ isAuthenticated });
  }
};

exports.getUserData = async (req, res) => {
  const isAuthenticated = await req.isAuthenticated();
  if (isAuthenticated) {
    res.status(200).json({ user: extractUserModel(req) });
  } else {
    res.status(401).send();
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
        res
          .status(200)
          .json({
            message: "Successfully Registered",
            user: extractUserModel(req),
          })
          .send();
      });
    }
  } catch (error) {
    handleErrorResponse(res, error, 500);
  }
};

exports.logIn = async (req, res, next) => {
  passport.authenticate("local", {
    failureMessage: true,
  })(req, res, (err) => {
    if (err) {
      console.error(err);
    }
    res.json({ user: extractUserModel(req) });
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
