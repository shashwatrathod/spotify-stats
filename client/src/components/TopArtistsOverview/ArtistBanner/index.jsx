import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";
import { useStyles } from "./artistBannerStyles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Slide,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const convertToFootballStadiumScale = (num) => {
  if (num < 1000000) {
    return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (num < 1000000000) {
    return `${Math.round((num / 1000000) * 10 + Number.EPSILON) / 10}M`;
  } else {
    return `${Math.round((num / 1000000000) * 10 + Number.EPSILON) / 10}B`;
  }
};

const ArtistBanner = (props) => {
  const [color, setColor] = useState("inherit");

  const classes = useStyles();

  useEffect(async () => {
    if (props.item) {
      if (!props.item.artist.color) {
        var image = new Image(64, 64);

        image.onload = async function () {
          var colorThief = new ColorThief();
          var color = await colorThief.getPalette(image, 7)[0];

          setColor(`rgba(${color[0]},${color[1]},${color[2]},0.6)`);

          var imgUrl = props.item.artist.images[2].url;
          var googleProxyURL =
            "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

          image.crossOrigin = "Anonymous";
          image.src = googleProxyURL + encodeURIComponent(imgUrl);
        };
      } else {
        setColor(props.item.artist.color);
      }
    }
  });

  if (props.item) {
    return (
      <>
        <Card style={{ background: color }} className={classes.root}>
          <div className={classes.artistInfoContainer}>
            <CardContent>
              <Slide
                direction="up"
                timeout={750}
                in={true}
                mountOnEnter
                unmountOnExit
              >
                <Typography variant="h3" className={classes.artistName}>
                  <Link
                    className={classes.link}
                    href={props.item.artist.spotify_url}
                    target="_blank"
                  >
                    #{props.item.index} {props.item.artist.name}
                  </Link>
                </Typography>
              </Slide>
              <Slide
                direction="up"
                in={true}
                timeout={600}
                mountOnEnter
                unmountOnExit
              >
                <Typography variant="subtitle1" className={classes.followers}>
                  {convertToFootballStadiumScale(
                    parseFloat(props.item.artist.followers)
                  )}{" "}
                  followers
                </Typography>
              </Slide>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            image={props.item.artist.images[1].url}
            title={props.item.artist.name}
          />
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card className={classes.root}>
          <Box className={classes.artistInfoContainer}>
            <CardContent>
              <Typography variant="h3" className={classes.artistName}>
                <Skeleton animation="wave" width={300} />
              </Typography>
              <Skeleton animation="wave" className={classes.followers} />
            </CardContent>
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              height={300}
              width={300}
              variant="rect"
            />
          </Box>
        </Card>
      </>
    );
  }
};

export default ArtistBanner;
