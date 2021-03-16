import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Collapse,
  Fade,
  Link,
  Slide,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "./trackCompactStyles";
import Skeleton from "@material-ui/lab/Skeleton";

const TrackCompact = (props) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => {
      const e = prevExpanded;
      return !e;
    });
  };

  if (props.item) {
    return (
      <>
        <Fade in={true} timeout={600}>
          <Card className={classes.root} style={{ background: props.bg }}>
            <div className={classes.otherContainer}>
              <CardMedia
                className={classes.cover}
                image={props.item.track.album.images[1].url}
                title={props.item.track.name}
              />
              <CardActionArea onClick={handleExpandClick}>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Slide
                      direction="up"
                      in={true}
                      timeout={600}
                      mountOnEnter
                      unmountOnExit
                    >
                      <Box className={classes.songNameBox}>
                        <Typography
                          component="h6"
                          variant="h6"
                          className={classes.songName}
                        >
                          <Link
                            className={classes.link}
                            href={`https://open.spotify.com/track/${props.item.track.id}`}
                            target="_blank"
                          >
                            {props.item.track.name}
                          </Link>
                        </Typography>
                      </Box>
                    </Slide>
                    <Slide
                      direction="up"
                      in={true}
                      timeout={700}
                      mountOnEnter
                      unmountOnExit
                    >
                      <div className={classes.artistNameContainer}>
                        <Typography
                          className={classes.artistName}
                          variant="subtitle2"
                          color="textSecondary"
                        >
                          {props.item.track.artists.map((artist, index) => {
                            if (index !== props.item.track.artists.length - 1) {
                              return (
                                <Link
                                  key={index}
                                  href={artist.spotify_url}
                                  target="_blank"
                                  className={classes.link}
                                >
                                  {artist.name},&nbsp;
                                </Link>
                              );
                            } else {
                              return (
                                <Link
                                  key={index}
                                  href={artist.spotify_url}
                                  target="_blank"
                                  className={classes.link}
                                >
                                  {artist.name}
                                </Link>
                              );
                            }
                          })}
                        </Typography>
                      </div>
                    </Slide>
                  </CardContent>
                </div>
              </CardActionArea>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent className={classes.cardContent}>
                <div className={classes.detailFeild}>
                  <Typography variant="subtitle2">Name:&nbsp;</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    <Link
                      className={classes.link}
                      href={`https://open.spotify.com/track/${props.item.track.id}`}
                      target="_blank"
                    >
                      {props.item.track.name}
                    </Link>
                  </Typography>
                </div>
                <div className={classes.detailFeild}>
                  <Typography variant="subtitle2">Artist(s):&nbsp;</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {props.item.track.artists.map((artist, index) => {
                      if (index !== props.item.track.artists.length - 1) {
                        return (
                          <Link
                            key={index}
                            href={artist.spotify_url}
                            target="_blank"
                            className={classes.link}
                          >
                            {artist.name},&nbsp;
                          </Link>
                        );
                      } else {
                        return (
                          <Link
                            key={index}
                            href={artist.spotify_url}
                            target="_blank"
                            className={classes.link}
                          >
                            {artist.name}
                          </Link>
                        );
                      }
                    })}
                  </Typography>
                </div>
                <div className={classes.detailFeild}>
                  <Typography variant="subtitle2">Album:&nbsp;</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    <Link
                      href={props.item.track.album.spotify_url}
                      target="_blank"
                      className={classes.link}
                    >
                      {props.item.track.album.name}
                    </Link>
                  </Typography>
                </div>
                <div className={classes.detailFeild}>
                  <Typography variant="subtitle2">Duration:&nbsp;</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {props.helperMethods.millisToMinuteSecond(
                      props.item.track.duration_ms
                    )}
                  </Typography>
                </div>
                {props.hasTime && (
                  <div className={classes.detailFeild}>
                    <Typography variant="subtitle2">
                      {props.timeLong ? "Played At:" : "Played:"}&nbsp;
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {props.timeLong
                        ? props.helperMethods.getFullDateString(
                            props.item.played_at
                          )
                        : props.helperMethods.timeDiff(
                            new Date(),
                            new Date(props.item.played_at)
                          )}
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Fade>
      </>
    );
  } else {
    return (
      <>
        <Card className={classes.root} style={{ background: "#37404a" }}>
          <div className={classes.otherContainer}>
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.cover}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Box className={classes.songNameBox}>
                  <Skeleton
                    animation="wave"
                    className={classes.songName}
                    width={"80%"}
                  />
                </Box>
                <div className={classes.artistNameContainer}>
                  <Skeleton
                    animation="wave"
                    className={classes.artistName}
                    width={"50%"}
                  />
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </>
    );
  }
};

export default TrackCompact;
