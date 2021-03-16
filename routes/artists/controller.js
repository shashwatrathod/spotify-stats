var axios = require("axios");
const { getPaletteFromURL } = require("color-thief-node");
const _ = require("lodash");

const getTopArtists = async (limit, time_range, access_token) => {
  var config = {
    method: "get",
    url: `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${time_range}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  var response = axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });

  return response;
};

const handleTopArtistsObject = (_top) => {
  try {
    var res = {};
    var items = [];
    var _items = _top.items;

    _items.forEach((_item, index) => {
      var item = {};

      item.artist = handleArtistObject(_item);
      item.index = index + 1;
      items.push(item);
    });
    res.items = items;
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const handleArtistObject = (_artist) => {
  var artist = {};

  _artist.external_urls.spotify
    ? (artist.spotify_url = _artist.external_urls.spotify)
    : "ignore";
  _artist.followers.total
    ? (artist.followers = _artist.followers.total)
    : "ignore";
  _artist.genres ? (artist.genres = _artist.genres) : "ignore";
  _artist.id ? (artist.id = _artist.id) : "ignore";
  _artist.images ? (artist.images = _artist.images) : "ignore";
  _artist.name ? (artist.name = _artist.name) : "ignore";
  _artist.popularity ? (artist.popularity = _artist.popularity) : "ignore";
  _artist.uri ? (_artist.uri = artist.uri) : "ignore";

  return artist;
};

const getColorForAll = async (_response) => {
  const items = _response.items.map(async (_item, index) => {
    var item = _.cloneDeep(_item);

    item.artist.color = await getColor(_item.artist.images[2].url);

    return item;
  });

  return Promise.all(items).then((completed) => {
    var response = _.cloneDeep(_response);
    response.items = completed;
    return response;
  });
};

const getColor = async (url) => {
  var color = await getPaletteFromURL(url);
  color = color[0];
  return `rgba(${color[0]},${color[1]},${color[2]},0.6)`;
};

module.exports = {
  getTopArtists,
  handleTopArtistsObject,
  getColorForAll,
};
