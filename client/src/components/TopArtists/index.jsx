import {
  Breadcrumbs,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UIStateContext } from "../Contexts/UIStateContext";
import { UserContext } from "../Contexts/UserContext";
import ArtistSection from "./ArtistSection";
import { useStyles } from "./topArtistsStyles";
import { Link as RouterLink } from "react-router-dom";

const TopArtists = () => {
  const classes = useStyles();
  const { accessToken } = useContext(UserContext)[0];
  const { artistTimeFrame, setArtistTimeFrame } = useContext(UIStateContext)[0];

  const [timeFrameText, setTimeFrameText] = useState("4 weeks");
  const [redirect, setRedirect] = useState(false);

  const handleTabChange = (event, newValue) => {
    setArtistTimeFrame(newValue);
  };

  useEffect(() => {
    if (artistTimeFrame || artistTimeFrame == 0) {
      switch (artistTimeFrame) {
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
  }, [artistTimeFrame]);

  useEffect(() => {
    if (!accessToken) {
      setRedirect("/?redirect=top_artists");
    }
  }, [accessToken]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

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
            to="/top_artists"
            variant="body1"
          >
            Top Artists
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" className={classes.titleText}>
          Your Top Artists (of {timeFrameText})
        </Typography>
        <Paper className={classes.tab}>
          <Tabs
            value={artistTimeFrame}
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
        <ArtistSection timeFrame={artistTimeFrame} />
      </Container>
    </>
  );
};

export default TopArtists;
