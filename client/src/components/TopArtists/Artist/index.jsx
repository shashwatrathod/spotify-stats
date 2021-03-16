import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fade,
  Link,
  Slide,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./artistStyles";

const convertToFootballStadiumScale = (num) => {
  if (num < 1000000) {
    return `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (num < 1000000000) {
    return `${Math.round((num / 1000000) * 10 + Number.EPSILON) / 10}M`;
  } else {
    return `${Math.round((num / 1000000000) * 10 + Number.EPSILON) / 10}B`;
  }
};

const Artist = (props) => {
  const classes = useStyles();

  const [color, setColor] = useState("inherit");

  useEffect(async () => {
    if (!props.item.artist.color) {
      var image = new Image(64, 64);

      image.onload = async function () {
        var colorThief = new ColorThief();
        var color = await colorThief.getPalette(image, 7)[0];

        // setColor(
        //   `linear-gradient(to right, rgba(${color[0]},${color[1]},${color[2]},0.6), rgba(33, 43, 54,0.6))`
        // );

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
  });

  return (
    <>
      <Fade in={true} timeout={500}>
        <Card className={classes.root} style={{ background: color }}>
          <CardActionArea>
            <Link
              rel="noopener"
              underline="none"
              href={props.item.artist.spotify_url}
              target="_blank"
              className={classes.cardActionAreaLink}
            >
              <CardMedia
                className={classes.cover}
                image={props.item.artist.images[1].url}
                title={props.item.artist.name}
              />
              <CardContent>
                <Box className={classes.artistInfoParentContainer}>
                  <Box className={classes.indexContainer}>
                    <Typography variant="h6">{props.item.index}.</Typography>
                  </Box>
                  <Box className={classes.artistInfoContainer}>
                    <Typography
                      variant="h5"
                      className={classes.artistNameContainer}
                    >
                      {props.item.artist.name}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {convertToFootballStadiumScale(
                        parseFloat(props.item.artist.followers)
                      )}{" "}
                      followers
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {props.item.artist.genres.length > 2 &&
                        props.item.artist.genres.slice(0, 2).join(" • ")}
                      {props.item.artist.genres.length <= 2 &&
                        props.item.artist.genres.join(" • ")}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Fade>
    </>
  );
};

export default Artist;
