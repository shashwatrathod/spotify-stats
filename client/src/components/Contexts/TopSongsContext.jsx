import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const TopSongsContext = createContext();

export const TopSongsProvider = (props) => {
  const { accessToken } = useContext(UserContext)[0];
  const [topSongsCompact, setTopSongsCompact] = useState(false);
  const [topSongsShort, setTopSongsShort] = useState(false);
  const [topSongsMedium, setTopSongsMedium] = useState(false);
  const [topSongsLong, setTopSongsLong] = useState(false);

  const resetTopSongsContext = () => {
    setTopSongsCompact(false);
    setTopSongsShort(false);
    setTopSongsMedium(false);
    setTopSongsLong(false);
  };

  const fetchTopSongs = async (limit, time_range) => {
    if (accessToken) {
      var data = JSON.stringify({
        limit,
        time_range,
      });

      var config = {
        method: "post",
        url: `/api/tracks/top`,
        headers: {
          "Content-Type": "application/json",
          access_token: `${accessToken.access_token}`,
          client_id: `${import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID}`,
        },
        data: data,
      };

      var tracks = await axios(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });

      return tracks;
    } else {
      return false;
    }
  };

  const value = {
    topSongsCompact,
    setTopSongsCompact,
    topSongsShort,
    setTopSongsShort,
    topSongsMedium,
    setTopSongsMedium,
    topSongsLong,
    setTopSongsLong,
    fetchTopSongs,
    resetTopSongsContext,
  };

  return (
    <TopSongsContext.Provider value={[value]}>
      {props.children}
    </TopSongsContext.Provider>
  );
};
