const express = require("express");
const volleyball = require("volleyball");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(volleyball);
app.use(cors());

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));

const authRouter = require("./routes/auth/index.js");
const tracksRouter = require("./routes/tracks/index.js");
const artistsRouter = require("./routes/artists/index.js");
const userRouter = require("./routes/user/index.js");

app.use("/api/auth", authRouter);
app.use("/api/tracks", tracksRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/user", userRouter);

const notFound = (error, req, res, next) => {
  if (!error) {
    res.status(404);
    const error = new Error("Not Found = " + req.originalUrl);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

app.use(notFound);
app.use(errorHandler);

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Up and Running at http://localhost:${port}`);
});
