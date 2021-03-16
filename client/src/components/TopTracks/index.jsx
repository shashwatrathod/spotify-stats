import {
  Breadcrumbs,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { UIStateContext } from "../Contexts/UIStateContext";
import { useStyles } from "./topTracksStyles";
import { Redirect } from "react-router-dom";
import TracksSection from "./TracksSection";
import { Link as RouterLink } from "react-router-dom";

const TopTracks = () => {
  const classes = useStyles();
  const { accessToken } = useContext(UserContext)[0];
  const { timeFrame, setTimeFrame } = useContext(UIStateContext)[0];

  const [timeFrameText, setTimeFrameText] = useState("4 weeks");
  const [redirect, setRedirect] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTimeFrame(newValue);
  };

  useEffect(() => {
    if (timeFrame || timeFrame == 0) {
      switch (timeFrame) {
        case 0:
          setTimeFrameText("last 4 weeks");
          break;
        case 1:
          setTimeFrameText("last 6 months");
          break;
        case 2:
          setTimeFrameText("all time");
          break;
        default:
          setTimeFrameText("last 4 weeks");
      }
    }
  }, [timeFrame]);

  useEffect(() => {
    if (!accessToken) {
      setRedirect("/?redirect=top_tracks");
    }
  }, [accessToken]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  //TODO: Make track render more efficient

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
            to="/top_tracks"
            variant="body1"
          >
            Top Tracks
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" className={classes.titleText}>
          Your Top Tracks (of {timeFrameText})
        </Typography>
        <Paper className={classes.tab}>
          <Tabs
            value={timeFrame}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="4 weeks" />
            <Tab label="6 months" />
            <Tab label="All time" />
          </Tabs>
        </Paper>
        <TracksSection timeFrame={timeFrame} />
      </Container>
    </>
  );
};

export default TopTracks;
