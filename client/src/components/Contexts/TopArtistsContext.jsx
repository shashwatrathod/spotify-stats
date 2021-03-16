import React, { useContext, useState, createContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const TopArtistsContext = createContext();

export const TopArtistProvider = (props) => {
  const { accessToken } = useContext(UserContext)[0];
  const [topArtistsCompact, setTopArtistsCompact] = useState(false);
  const [topArtistsShort, setTopArtistsShort] = useState(false);
  const [topArtistsMedium, setTopArtistsMedium] = useState(false);
  const [topArtistsLong, setTopArtistsLong] = useState(false);

  const resetTopArtistContext = () => {
    setTopArtistsCompact(false);
    setTopArtistsShort(false);
    setTopArtistsMedium(false);
    setTopArtistsLong(false);
  };

  const fetchTopArtists = async (limit, time_range) => {
    if (accessToken) {
      var data = JSON.stringify({
        limit,
        time_range,
      });

      var config = {
        method: "post",
        url: `/api/artists/top`,
        headers: {
          "Content-Type": "application/json",
          access_token: `${accessToken.access_token}`,
          client_id: `${import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID}`,
        },
        data: data,
      };

      var artists = await axios(config)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
      return artists;
    } else {
      return false;
    }
  };
  const value = {
    topArtistsCompact,
    setTopArtistsCompact,
    topArtistsShort,
    setTopArtistsShort,
    topArtistsMedium,
    setTopArtistsMedium,
    topArtistsLong,
    setTopArtistsLong,
    fetchTopArtists,
    resetTopArtistContext,
  };

  return (
    <>
      <TopArtistsContext.Provider value={[value]}>
        {props.children}
      </TopArtistsContext.Provider>
    </>
  );
};
