import React, { useContext, useEffect, useState } from "react";
import { TopArtistsContext } from "../../Contexts/TopArtistsContext";
import Artist from "../Artist";
import { useStyles } from "./artistSectionStyles";
import _ from "lodash";
import { Box, CircularProgress } from "@material-ui/core";

const ArtistSection = (props) => {
  const classes = useStyles();
  const [shouldRender, setShouldRender] = useState(false);
  const [artists, setArtists] = useState(false);

  const {
    topArtistsShort,
    setTopArtistsShort,
    topArtistsMedium,
    setTopArtistsMedium,
    topArtistsLong,
    setTopArtistsLong,
    fetchTopArtists,
  } = useContext(TopArtistsContext)[0];

  useEffect(async () => {
    setArtists(false);
    switch (props.timeFrame) {
      case 0:
        if (!topArtistsShort) {
          var tempArtists = await fetchTopArtists(50, "short_term");
          tempArtists ? setTopArtistsShort(_.cloneDeep(tempArtists)) : "ignore"; //! Show error
          tempArtists ? setArtists(_.cloneDeep(tempArtists)) : "ignore";
        } else {
          setArtists(_.cloneDeep(topArtistsShort));
        }
        break;
      case 1:
        if (!topArtistsMedium) {
          var tempArtists = await fetchTopArtists(50, "medium_term");
          tempArtists
            ? setTopArtistsMedium(_.cloneDeep(tempArtists))
            : "ignore"; //! Show error
          tempArtists ? setArtists(_.cloneDeep(tempArtists)) : "ignore";
        } else {
          setArtists(_.cloneDeep(topArtistsMedium));
        }
        break;
      case 2:
        if (!topArtistsLong) {
          var tempArtists = await fetchTopArtists(50, "long_term");
          tempArtists ? setTopArtistsLong(_.cloneDeep(tempArtists)) : "ignore"; //! Show error
          tempArtists ? setArtists(_.cloneDeep(tempArtists)) : "ignore";
        } else {
          setArtists(_.cloneDeep(topArtistsLong));
        }
        break;
    }
  }, [props.timeFrame]);

  useEffect(() => {
    artists ? setShouldRender(true) : setShouldRender(false);
  }, [artists]);

  if (shouldRender && artists) {
    return (
      <>
        <Box className={classes.root}>
          {artists.items.map((item, index) => {
            return <Artist key={index} item={item} />;
          })}
        </Box>
      </>
    );
  } else {
    return (
      <Box className={classes.root}>
        <CircularProgress color="primary" style={{ marginTop: "1rem" }} />
      </Box>
    );
  }
};

export default ArtistSection;
