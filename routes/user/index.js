const express = require("express");
const { getUser, handleUserObject } = require("./controller");

const router = express.Router();

router.get("/", async (req, res) => {
  if (req.headers.access_token) {
    var _user = await getUser(req.headers.access_token);

    if (_user) {
      var user = handleUserObject(_user);
      user ? res.status(200).json(user) : res.status(400).send("Error");
    } else {
      res.status(400).send("Error");
    }
  } else {
    res.status(400).send("No Access Token");
  }
});

module.exports = router;
