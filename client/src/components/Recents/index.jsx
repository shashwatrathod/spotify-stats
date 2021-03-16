import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Track from "../Track";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./recentStyles";
import { RecentSongsContext } from "../Contexts/RecentSongsContext";
import _ from "lodash";
import { Link as RouterLink } from "react-router-dom";

const RecentsPage = () => {
  const { accessToken } = useContext(UserContext)[0];
  const { recentLong, setRecentLong, fetchRecentSongs } = useContext(
    RecentSongsContext
  )[0];
  const [shouldRender, setShouldRender] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const classes = useStyles();
  useEffect(async () => {
    if (accessToken && !recentLong) {
      var _recentLong = await fetchRecentSongs(50);
      _recentLong ? setRecentLong(_.cloneDeep(_recentLong)) : "ignore";
    }
  }, []);

  useEffect(() => {
    if (!accessToken) {
      setRedirect("/?redirect=recents");
    }
  }, [accessToken]);

  useEffect(() => {
    if (recentLong) {
      setShouldRender(true);
    }
  }, [recentLong]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (shouldRender) {
    return (
      <>
        <Container className={classes.root}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography
              color="inherit"
              component={RouterLink}
              to="/home"
              className={classes.breadcrumbLink}
              variant="body1"
            >
              Home
            </Typography>
            <Typography
              className={classes.breadcrumbLink}
              color="textPrimary"
              component={RouterLink}
              to="/recents"
              variant="body1"
            >
              Recent Tracks
            </Typography>
          </Breadcrumbs>
          <Typography className={classes.titleText} variant="h4">
            Recently Played Songs
          </Typography>
          <div className={classes.tracksContainer}>
            {recentLong.items.map((item, index) => {
              return (
                <div className={classes.trackContainer} key={index}>
                  <div className={classes.indexTextContainer}>
                    <Typography>{index + 1}.</Typography>
                  </div>
                  <Track
                    item={item}
                    timeLong={true}
                    hasTime={true}
                    compact={false}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container className={classes.root}>
          <Typography className={classes.titleText} variant="h4">
            Recently Played Songs
          </Typography>
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
                    hasTime={true}
                    compact={false}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </>
    );
  }
};

export default RecentsPage;
