import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "30px",
    display: "flex",
    flexDirection: "row",
    width: "800px",
    alignSelf: "center",
    // maxWidth: "1000px",
  },
  artistInfoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
  },
  cover: {
    alignSelf: "flex-end",
    height: 300,
    width: 300,
    minHeight: 300,
    minWidth: 300,
  },
  artistName: {
    margin: "0.5rem",
  },
  followers: {
    margin: "0rem 0.5rem 0.5rem 0.5rem",
  },
  link: {
    padding: "0rem",
    margin: "0rem",
    textDecoration: "none",
    color: "inherit",
  },
  linkUnderline: {
    textDecoration: "undeline",
    textDecorationThickness: "2px",
  },
}));
