const express = require("express");
const {
  getRecentlyPlayed,
  handleRecentObject,
  getTopTracks,
  handleTopTrackObject,
  getColorForAll,
} = require("./controller");
const Joi = require("joi");
const router = express.Router();

const recentTracksBodySchema = Joi.object().keys({
  limit: Joi.number().integer().min(1).max(50).required(),
});

const topTracksBodySchema = Joi.object().keys({
  limit: Joi.number().integer().min(1).max(50).required(),
  time_range: Joi.string()
    .valid("short_term", "long_term", "medium_term")
    .required(),
});

router.post("/recent", async (req, res) => {
  const validationResult = recentTracksBodySchema.validate(req.body);
  if (!validationResult.error) {
    if (
      req.headers.client_id == process.env.CLIENT_ID &&
      req.headers.access_token
    ) {
      var recent = await getRecentlyPlayed(
        req.headers.access_token,
        req.body.limit
      );

      if (recent && recent.items) {
        var response = handleRecentObject(recent);

        if (response) {
          var resp = await getColorForAll(response);
          res.status(200).json(resp);
        } else {
          res.status(400).send("Error");
        }
      } else {
        console.log("Problem with Spotify Resp.");
        res.status(400).send("Error");
      }
    } else {
      console.log("Problem with Headers!");
      res.status(400).send("Error");
    }
  } else {
    console.log("Validation Error");
    res.status(400).send(validationResult.error);
  }
});

router.post("/top", async (req, res) => {
  const validationResult = topTracksBodySchema.validate(req.body);
  if (!validationResult.error) {
    if (
      req.headers.client_id == process.env.CLIENT_ID &&
      req.headers.access_token
    ) {
      var top = await getTopTracks(
        req.headers.access_token,
        req.body.limit,
        req.body.time_range
      );

      if (top && top.items) {
        var response = handleTopTrackObject(top);

        if (response) {
          var resp = await getColorForAll(response);
          res.status(200).json(resp);
        } else {
          res.status(400).send("Error");
        }
      } else {
        console.log("Problem with Spotify Resp.");
        res.status(400).send("Error");
      }
    } else {
      console.log("Problem with Headers");
      res.status(400).send("Error");
    }
  } else {
    console.log("Validation error");
    res.status(400).send(validationResult.error);
  }
});

module.exports = router;
