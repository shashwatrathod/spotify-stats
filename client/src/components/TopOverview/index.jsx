import { Card, CircularProgress, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useStyles } from "./topOverviewStyles";
import _ from "lodash";
import Track from "../Track";
import { Link } from "react-router-dom";
import { TopSongsContext } from "../Contexts/TopSongsContext";

const TopOverview = () => {
  const { topSongsCompact, setTopSongsCompact, fetchTopSongs } = useContext(
    TopSongsContext
  )[0];
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(async () => {
    if (!topSongsCompact) {
      var _topSongsCompact = await fetchTopSongs(3, "long_term");

      _topSongsCompact
        ? setTopSongsCompact(_.cloneDeep(_topSongsCompact))
        : "ignore";
    }
  }, []);

  useEffect(() => {
    topSongsCompact ? setShouldRender(true) : "ignore";
  });

  const classes = useStyles();

  if (shouldRender) {
    return (
      <>
        <Card className={classes.rootCard}>
          <Typography variant="h4" className={classes.titleText}>
            Top Tracks
          </Typography>
          <ul className={classes.trackList}>
            {topSongsCompact.items.map((item, index) => {
              return (
                <li key={index} className={classes.trackListElement}>
                  <Track
                    key={index}
                    item={item}
                    timeLong={false}
                    hasTime={false}
                    compact
                  />
                </li>
              );
            })}
          </ul>
          <Link to="/top_tracks" className={classes.viewMoreLink}>
            View more top tracks &gt;&gt;
          </Link>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card className={classes.rootCard}>
          <Typography variant="h4" className={classes.titleText}>
            Top Tracks
          </Typography>
          <div className={classes.tracksContainer}>
            <ul className={classes.trackList}>
              {[...Array(3)].map((item, index) => {
                return (
                  <li key={index} className={classes.trackListElement}>
                    <Track
                      key={index}
                      item={false}
                      timeLong={false}
                      hasTime={false}
                      compact
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      </>
    );
  }
};

export default TopOverview;
