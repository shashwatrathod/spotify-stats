var axios = require("axios");
var qs = require("qs");

const getAccessTokenFromSpotify = async (code) => {
  var data = qs.stringify({
    grant_type: "authorization_code",
    redirect_uri: `${process.env.FRONTEND_REDIRECT_URI}`,
    code: `${code}`,
  });
  var config = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${process.env.BASE64ENCODED}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  res = axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
      return false;
    });

  return res;
};

const getAccessTokenFromRefreshTokenSpotify = async (token) => {
  var data = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: `${token}`,
  });
  var config = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${process.env.BASE64ENCODED}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  res = axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
      return false;
    });

  return res;
};

const getAccessTokenResponseBody = (response) => {
  return {
    access_token: response.access_token,
    token_type: response.token_type,
  };
};

module.exports = {
  getAccessTokenFromSpotify,
  getAccessTokenFromRefreshTokenSpotify,
  getAccessTokenResponseBody,
};
