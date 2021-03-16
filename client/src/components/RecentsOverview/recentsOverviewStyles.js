import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  rootCard: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    margin: "1rem",
    width: "auto",
    borderRadius: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  trackList: {
    listStyle: "none",
    padding: "0rem",
  },
  titleText: {
    alignSelf: "start",
    fontSize: "1.5rem",
    fontWeight: "600",
    margin: "0.2rem 0.5rem",
  },
  trackListElement: {},
  viewMoreLink: {
    textDecoration: "underline",
    color: "inherit",
    fontSize: "0.9rem",
    alignSelf: "start",
    fontWeight: "400",
    marginLeft: "0.5rem",

    "&:hover": {
      fontSize: "0.92rem",
    },
  },
}));
