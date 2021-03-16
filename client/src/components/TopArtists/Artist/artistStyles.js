import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 300,
    borderRadius: "12px",
    margin: "0.5rem",
    contentVisibility: "auto",
  },
  cardActionAreaLink: {
    textDecoration: "none",
    color: "inherit",
    fontSize: "inherit",

    "&hover": {
      textDecoration: "none",
    },
  },
  cover: {
    width: 300,
    minWidth: 300,
    maxWidth: 300,
    height: 300,
    minHeight: 300,
    maxHeight: 300,
  },
  artistInfoParentContainer: {
    display: "flex",
    flexDirection: "row",
  },
  indexContainer: {
    display: "flex",
    alignItems: "center",
    width: "12%",
  },
  artistInfoContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "0.5rem",
    width: "85%",
  },
  artistNameContainer: {
    display: "flex",
    flexDirection: "row",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));
