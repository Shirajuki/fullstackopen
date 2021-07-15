const http = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
