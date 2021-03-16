import { CircularProgress, ListItem, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Track from "../../Track";
import { useStyles } from "./tracksSectionStyles";
import _ from "lodash";
import { TopSongsContext } from "../../Contexts/TopSongsContext";

const TracksSection = (props) => {
  const {
    topSongsShort,
    setTopSongsShort,
    topSongsMedium,
    setTopSongsMedium,
    topSongsLong,
    setTopSongsLong,
    fetchTopSongs,
  } = useContext(TopSongsContext)[0];

  const [tracks, setTracks] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const classes = useStyles();

  useEffect(async () => {
    setTracks(false); //manipulate shouldRender
    switch (props.timeFrame) {
      case 0:
        if (!topSongsShort) {
          var tempTracks = await fetchTopSongs(50, "short_term");
          tempTracks ? setTopSongsShort(_.cloneDeep(tempTracks)) : "ignore"; //! Show error
          tempTracks ? setTracks(_.cloneDeep(tempTracks)) : "ignore";
        } else {
          setTracks(_.cloneDeep(topSongsShort));
        }
        break;
      case 1:
        if (!topSongsMedium) {
          var tempTracks = await fetchTopSongs(50, "medium_term");
          tempTracks ? setTopSongsMedium(_.cloneDeep(tempTracks)) : "ignore"; //! Show error
          tempTracks ? setTracks(_.cloneDeep(tempTracks)) : "ignore";
        } else {
          setTracks(_.cloneDeep(topSongsMedium));
        }
        break;
      case 2:
        if (!topSongsLong) {
          var tempTracks = await fetchTopSongs(50, "long_term");
          tempTracks ? setTopSongsLong(_.cloneDeep(tempTracks)) : "ignore"; //! Show error
          tempTracks ? setTracks(_.cloneDeep(tempTracks)) : "ignore";
        } else {
          setTracks(_.cloneDeep(topSongsLong));
        }
        break;
    }
  }, [props.timeFrame]);

  useEffect(() => {
    tracks ? setShouldRender(true) : setShouldRender(false);
  }, [tracks]);

  if (shouldRender && tracks) {
    return (
      <>
        <div className={classes.tracksContainer}>
          {tracks.items.map((item, index) => {
            return (
              <div className={classes.trackContainer} key={index}>
                <div className={classes.indexTextContainer}>
                  <Typography>{index + 1}.</Typography>
                </div>
                <Track
                  item={item}
                  timeLong={true}
                  hasTime={false}
                  compact={false}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <div className={classes.tracksContainer}>
        {[...Array(5)].map((item, index) => {
          return (
            <div className={classes.trackContainer} key={index}>
              <div className={classes.indexTextContainer}>
                <Typography>{index + 1}.</Typography>
              </div>
              <Track
                item={false}
                timeLong={true}
                hasTime={false}
                compact={false}
              />
            </div>
          );
        })}
      </div>
    );
  }
};

export default TracksSection;
