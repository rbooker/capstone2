"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const membersRoutes = require("./routes/members");
const showsRoutes = require("./routes/shows");
const playlistsRoutes = require("./routes/playlists");
const songsRoutes = require("./routes/songs");
const favoritesRoutes = require("./routes/favorites");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/members", membersRoutes);
app.use("/shows", showsRoutes);
app.use("/playlists", playlistsRoutes);
app.use("/songs", songsRoutes);
app.use("/favorites", favoritesRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
