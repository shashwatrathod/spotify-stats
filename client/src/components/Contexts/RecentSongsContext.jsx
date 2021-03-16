import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import ColorThief from "colorthief";
import _ from "lodash";

export const RecentSongsContext = createContext();

export const RecentSongsProvider = (props) => {
  const { accessToken } = useContext(UserContext)[0];

  const [recentShort, setRecentShort] = useState(false);
  const [recentLong, setRecentLong] = useState(false);

  const resetRecentSongsContext = () => {
    setRecentShort(false);
    setRecentShort(false);
  };

  const fetchRecentSongs = async (limit) => {
    if (accessToken) {
      var data = JSON.stringify({
        limit,
      });

      var config = {
        method: "post",
        url: `/api/tracks/recent`,
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
          console.log(error.message);
          return false;
        });
      return tracks;
    } else {
      return false;
    }
  };

  const value = {
    recentShort,
    setRecentShort,
    recentLong,
    setRecentLong,
    fetchRecentSongs,
    resetRecentSongsContext,
  };

  return (
    <RecentSongsContext.Provider value={[value]}>
      {props.children}
    </RecentSongsContext.Provider>
  );
};
