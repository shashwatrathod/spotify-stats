import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  carouselContainer: {
    display: "flex",
    position: "relative",
    zIndex: 1,
  },
  onTop: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    zIndex: 3,
  },
  titleText: {
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: "1rem 1rem 0rem 1.5rem",
  },
  routerLink: {
    textDecoration: "none",
    color: "inherit",

    "&:hover": {
      fontSize: "101%",
    },
  },
}));
