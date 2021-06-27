const express = require("express");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("dotenv").config();
// file required
require("./src/helpers/init_mongodb");
require("./src/services/passport");

const AuthRoute = require("./src/routers/auth.router");
const MailRoute = require("./src/routers/mail.router");
const GoogleAuthRoute = require("./src/routers/googleAuth.router");

const app = express();

// middlewares
app.use(cors({ credentials: true, origin: process.env.URI }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["dkksdkklfslkd"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", AuthRoute);
app.use("/api", MailRoute);
app.use("/api", GoogleAuthRoute);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

if (["production"].includes(process.env.NODE_ENV)) {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
