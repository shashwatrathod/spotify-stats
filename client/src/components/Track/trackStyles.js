import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "0.5rem",
    width: "320px",
    borderRadius: "12px",
    flexDirection: "column",
    // maxHeight: 120,
  },
  otherContainer: {
    display: "flex",
    flexDirection: "row",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    // flex: "1 0 auto",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    textOverflow: "clip",
    overflow: "hidden",
    width: "100%",
  },
  cover: {
    width: 100,
    minWidth: 100,
    maxWidth: 100,
    height: 100,
    minHeight: 100,
    maxHeight: 100,
  },
  songNameBox: {
    maxWidth: "98%",
    display: "flex",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  songName: {
    display: "block",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    alignSelf: "left",
    position: "relative",
    fontSize: "1.2rem",
  },
  artistNameContainer: {
    display: "flex",
    flexDirection: "row",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  artistName: {
    marginTop: "0.7rem",
    fontSize: "0.8rem",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "100%",
  },
  detailFeild: {
    display: "flex",
    flexDirection: "row",
    fontSize: "0.1rem",
  },
  link: {
    padding: "0rem",
    margin: "0rem",
    textDecoration: "none",
    color: "inherit",
  },
}));
