const express = require("express");
const bodyParser = require("body-parser");
const db = require("./controllers/dbController");
const morgan = require("morgan");

//Import Middleware
const passportMiddleware = require("./middlewares/passportMiddleware");
const corsMiddleware = require("./middlewares/corsMiddleware");

//Import Routes
const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();
const port = 3000;

app.use(corsMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//Middleware Uses
app.use(passportMiddleware);

//Establish Mysql Connection
db.connect();
db.createUsersTable();

//Route
app.use("/", indexRoutes);
app.use("/user", usersRoutes);
app.use("/auth", authRoutes);

//If a request route is not exist send
app.use((req, res, next) => {
  res.status(404).send({ message: "404 NOT FOUND" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
