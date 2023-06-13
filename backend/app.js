const express = require("express");
const ErrorHandler = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// AWS S3 is better than this way
app.use("/", express.static(path.join(__dirname, "./uploads")));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./routes/user.route");
const product = require("./routes/products.route");

app.use("/api/v1/user", user);
app.use("/api/v1/product", product);

app.use(ErrorHandler);

module.exports = app;
