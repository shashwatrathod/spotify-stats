import React, { useEffect, useContext, useState } from "react";
import Track from "../Track";
import { Card, CircularProgress, Typography } from "@material-ui/core";
import { useStyles } from "./recentsOverviewStyles";
import { Link } from "react-router-dom";
import { RecentSongsContext } from "../Contexts/RecentSongsContext";
import _ from "lodash";

const RecentsOverview = () => {
  const { recentShort, setRecentShort, fetchRecentSongs } = useContext(
    RecentSongsContext
  )[0];
  const [shouldRender, setShouldRender] = useState(false);

  const classes = useStyles();

  useEffect(async () => {
    if (!recentShort) {
      var _recentShort = await fetchRecentSongs(3);
      _recentShort ? setRecentShort(_.cloneDeep(_recentShort)) : "ignore";
    }
  }, []);

  useEffect(async () => {
    if (recentShort) {
      setShouldRender(true);
    }
  }, [recentShort]);

  if (shouldRender) {
    return (
      <>
        <Card className={classes.rootCard}>
          <Typography variant="h4" className={classes.titleText}>
            Recents
          </Typography>
          <ul className={classes.trackList}>
            {recentShort.items.map((item, index) => {
              return (
                <li key={index} className={classes.trackListElement}>
                  <Track
                    key={index}
                    item={item}
                    timeLong={false}
                    hasTime={true}
                    compact
                  />
                </li>
              );
            })}
          </ul>
          <Link to="/recents" className={classes.viewMoreLink}>
            View more recently played songs &gt;&gt;
          </Link>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card className={classes.rootCard}>
          <Typography variant="h4" className={classes.titleText}>
            Recents
          </Typography>
          <ul className={classes.trackList}>
            {[...Array(3)].map((item, index) => {
              return (
                <li key={index} className={classes.trackListElement}>
                  <Track
                    key={index}
                    item={false}
                    timeLong={false}
                    hasTime={true}
                    compact
                  />
                </li>
              );
            })}
          </ul>
        </Card>
      </>
    );
  }
};

export default RecentsOverview;
