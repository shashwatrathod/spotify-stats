const axios = require("axios");

const getUser = async (access_token) => {
  var config = {
    method: "get",
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  return axios(config)
    .then(function (response) {
      if (response.data) {
        return response.data;
      } else {
        return false;
      }
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
};

const handleUserObject = (_user) => {
  var user = {};

  _user.country ? (user.country = _user.country) : "ignore";
  _user.display_name ? (user.display_name = _user.display_name) : "ignore";
  _user.external_urls.spotify
    ? (user.spotify_url = _user.external_urls.spotify)
    : "ignore";
  _user.id ? (user.id = _user.id) : "ignore";
  _user.images && _user.images[0] ? (user.image = _user.images[0]) : "ignore";
  return user;
};

module.exports = {
  getUser,
  handleUserObject,
};
