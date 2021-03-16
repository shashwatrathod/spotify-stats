const { response } = require("express");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  getAccessTokenFromSpotify,
  getAccessTokenFromRefreshTokenSpotify,
  getAccessTokenResponseBody,
} = require("./controller");

const authTokenReqSchema = Joi.object().keys({
  code: Joi.string()
    .trim()
    .regex(/(^[a-zA-Z0-9\-_]+$)/)
    .required(),
  client_id: Joi.string()
    .trim()
    .regex(/(^[a-zA-Z0-9]+$)/)
    .required(),
});

const logoutReqSchema = Joi.object().keys({
  client_id: Joi.string()
    .trim()
    .regex(/(^[a-zA-Z0-9]+$)/)
    .required(),
});

router.get("/", async (req, res) => {
  //get an access token from spotify if refresh token exists.
  if (req.headers.client_id == process.env.CLIENT_ID) {
    if (
      req.cookies.refresh_token &&
      Date.now() - req.cookies.refresh_token.timeInMillis <
        req.cookies.refresh_token.expiresInMillis
    ) {
      var response = await getAccessTokenFromRefreshTokenSpotify(
        req.cookies.refresh_token.token
      );

      if (response.access_token) {
        //update cookie
        res.cookie("refresh_token", {
          token: req.cookies.refresh_token.token,
          timeInMillis: Date.now(),
          expiresInMillis: response.expires_in * 1000,
        });

        body = getAccessTokenResponseBody(response);
        res.status(200).json(body);
      } else {
        res.status(400);
        res.send("Error");
      }
    } else {
      res.status(400);
      res.send("Error");
    }
  } else {
    res.status(400);
    res.send("Error");
  }
});

router.post("/", async (req, res, next) => {
  const validationResult = authTokenReqSchema.validate(req.body);

  if (!validationResult.error && req.body.client_id == process.env.CLIENT_ID) {
    var response = await getAccessTokenFromSpotify(req.body.code);

    if (response && response.refresh_token) {
      res.cookie(
        "refresh_token",
        {
          token: response.refresh_token,
          timeInMillis: Date.now(),
          expiresInMillis: response.expires_in * 1000,
        },
        { httpOnly: true }
      );

      body = getAccessTokenResponseBody(response);
      res.status(200).json(body);
    } else {
      res.status(400);
      res.send("Error");
    }
  } else {
    res.status(404);
    console.log(validationResult.error);
    res.json(validationResult.error.details);
  }
});

router.delete("/", async (req, res, next) => {
  const validationResult = logoutReqSchema.validate(req.body);

  if (!validationResult.error && req.body.client_id == process.env.CLIENT_ID) {
    if (req.cookies.refresh_token) {
      res.clearCookie("refresh_token");
    }
    res.status(200);
    res.send("Success");
  } else {
    console.log("Invalid client ID");
    res.status(400);
    res.send("Error");
  }
});

module.exports = router;
