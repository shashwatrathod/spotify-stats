const express = require("express");
const Joi = require("joi");
const {
  getTopArtists,
  handleTopArtistsObject,
  getColorForAll,
} = require("./controller");
const router = express.Router();

const topArtistsBodySchema = Joi.object().keys({
  limit: Joi.number().integer().min(1).max(50).required(),
  time_range: Joi.string()
    .valid("short_term", "long_term", "medium_term")
    .required(),
});

router.post("/top", async (req, res) => {
  const validationResult = topArtistsBodySchema.validate(req.body);
  if (!validationResult.error) {
    if (
      req.headers.client_id == process.env.CLIENT_ID &&
      req.headers.access_token
    ) {
      var top = await getTopArtists(
        req.body.limit,
        req.body.time_range,
        req.headers.access_token
      );
      if (top && top.items) {
        var response = handleTopArtistsObject(top);

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
      //TODO return
    } else {
      console.log("Problem with Headers!");
      res.status(400).send("Error");
    }
  } else {
    console.log("Validation Error");
    res.status(400).send(validationResult.error);
  }
});

module.exports = router;
