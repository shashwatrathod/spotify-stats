import { Typography, useTheme } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { useStyles } from "./myCarouselStyles";

const MyCarousel = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.carouselContainer}>
          <Carousel
            animation="slide"
            timeout={500}
            navButtonsProps={{
              style: {
                width: "2rem",
                height: "2rem",
              },
            }}
            activeIndicatorIconButtonProps={{
              style: { fontSize: "15px", color: theme.palette.primary.main },
            }}
          >
            {props.children}
          </Carousel>
        </div>
        <div className={classes.onTop}>
          <Typography className={classes.titleText} variant="h4">
            <Link to="/top_artists" className={classes.routerLink}>
              Top Artists
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default MyCarousel;
