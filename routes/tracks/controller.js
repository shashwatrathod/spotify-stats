var axios = require("axios");
const { response } = require("express");
const { getPaletteFromURL } = require("color-thief-node");
const _ = require("lodash");

const getRecentlyPlayed = async (access_token, limit) => {
  var config = {
    method: "get",
    url: `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
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

const getTopTracks = async (access_token, limit, time_range) => {
  var config = {
    method: "get",
    url: `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${time_range}`,
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

const handleRecentObject = (recent) => {
  var res = {};
  var items = [];
  var _items = recent.items;
  var total_duration_ms = 0;

  _items.map((_item, index) => {
    var item = {};
    var _track = _item.track;

    item.track = handleTrackObject(_track);
    item.track.duration_ms
      ? (total_duration_ms += item.track.duration_ms)
      : "ignore";

    _item.played_at ? (item.played_at = _item.played_at) : "ignore";

    if (_item.context) {
      var _context = _item.context;
      var context = {};

      _context.external_urls.spotify
        ? (context.spotify_url = _context.external_urls.spotify)
        : "ignore";

      _context.type ? (context.type = _context.type) : "ignore";

      _context.href ? (context.href = _context.href) : "ignore";

      item.context = context;
    }

    item.index = index + 1;

    items.push(item);
  });

  res.items = items;

  if (recent.cursors) {
    res.period = recent.cursors.after - recent.cursors.before;
  }

  recent.limit ? (res.limit = recent.limit) : "ignore";

  res.total_duration_ms = total_duration_ms;

  return res;
};

const handleTopTrackObject = (top) => {
  var res = {};
  var items = [];
  var _items = top.items;

  _items.map((_item, index) => {
    var item = {};

    item.track = handleTrackObject(_item);

    item.index = index + 1;

    items.push(item);
  });

  res.items = items;

  top.limit ? (res.limit = top.limit) : "ignore";

  return res;
};

const handleTrackObject = (_track) => {
  var track = {};
  if (_track.album) {
    var _album = _track.album;
    track.album = handleAlbumObject(_album);
  }

  if (_track.artists) {
    _artists = _track.artists;
    track.artists = handleArtistsObject(_artists);
  }

  _track.duration_ms ? (track.duration_ms = _track.duration_ms) : "ignore";

  _track.id ? (track.id = _track.id) : "ignore";

  _track.name ? (track.name = _track.name) : "ignore";

  _track.uri ? (track.uri = _track.uri) : "ignore";

  return track;
};

const handleAlbumObject = (_album) => {
  var album = {};
  _album.id ? (album.id = _album.id) : "ignore";

  _album.external_urls.spotify
    ? (album.spotify_url = _album.external_urls.spotify)
    : "ignore";

  _album.name ? (album.name = _album.name) : "ignore";

  _album.uri ? (album.uri = _album.uri) : "ignore";

  _album.images ? (album.images = _album.images) : "ignore";

  return album;
};

const handleArtistsObject = (_artists) => {
  var artists = [];

  _artists.map((_artist) => {
    var artist = {};

    _artist.id ? (artist.id = _artist.id) : "ignore";

    _artist.name ? (artist.name = _artist.name) : "ignore";

    _artist.external_urls.spotify
      ? (artist.spotify_url = _artist.external_urls.spotify)
      : "ignore";

    _artist.uri ? (artist.uri = _artist.uri) : "ignore";

    artists.push(artist);
  });

  return artists;
};

const getColorForAll = async (_response) => {
  const items = _response.items.map(async (_item, index) => {
    var item = _.cloneDeep(_item);

    item.track.album.color = await getColor(_item.track.album.images[2].url);

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
  getRecentlyPlayed,
  getTopTracks,
  handleRecentObject,
  handleTopTrackObject,
  getColorForAll,
};
