import {
  Card,
  CardContent,
  CardMedia,
  Link,
  Fade,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./trackNotSoCompactStyles";
import Skeleton from "@material-ui/lab/Skeleton";

const TrackNotSoCompact = (props) => {
  const classes = useStyles(props.hasTime)();

  if (props.item) {
    return (
      <>
        <Fade in={true} timeout={500}>
          <Card className={classes.root} style={{ background: props.bg }}>
            <div className={classes.containerOne}>
              <CardMedia
                className={classes.cover}
                image={props.item.track.album.images[1].url}
                title={props.item.track.name}
              />
            </div>
            <div className={classes.containerTwo}>
              <CardContent className={classes.trackNameAndArtist}>
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
              </CardContent>
              <CardContent className={classes.trackAlbum}>
                <Typography variant="subtitle2" color="textSecondary">
                  <Link
                    href={props.item.track.album.spotify_url}
                    target="_blank"
                    className={classes.link}
                  >
                    {props.item.track.album.name}
                  </Link>
                </Typography>
              </CardContent>
              <CardContent className={classes.trackDuration}>
                <Typography variant="subtitle2" color="textSecondary">
                  {props.helperMethods.millisToMinuteSecond(
                    props.item.track.duration_ms
                  )}
                </Typography>
              </CardContent>
              {props.hasTime && (
                <CardContent className={classes.trackLastPlayed}>
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
                </CardContent>
              )}
            </div>
          </Card>
        </Fade>
      </>
    );
  } else {
    return (
      <>
        <Card className={classes.root}>
          <div className={classes.containerOne}>
            <Skeleton
              className={classes.cover}
              variant="rect"
              animation="wave"
            />
          </div>
          <div className={classes.containerTwo}>
            <CardContent className={classes.trackNameAndArtist}>
              <Typography
                component="h6"
                variant="h6"
                className={classes.songName}
              >
                <Skeleton animation="wave" />
              </Typography>
              <Typography
                className={classes.artistName}
                variant="subtitle2"
                color="textSecondary"
              >
                <Skeleton animation="wave" />
              </Typography>
            </CardContent>
            <CardContent className={classes.trackAlbum}>
              <Typography variant="subtitle2" color="textSecondary">
                <Skeleton animation="wave" width={140} />
              </Typography>
            </CardContent>
            <CardContent className={classes.trackDuration}>
              <Skeleton animation="wave" width={80} />
            </CardContent>
            {props.hasTime && (
              <CardContent className={classes.trackLastPlayed}>
                <Typography variant="subtitle2">
                  <Skeleton animation="wave" />
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  <Skeleton animation="wave" />
                </Typography>
              </CardContent>
            )}
          </div>
        </Card>
      </>
    );
  }
};

export default TrackNotSoCompact;
