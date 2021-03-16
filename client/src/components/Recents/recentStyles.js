import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  titleText: {
    margin: "1rem",
    fontWeight: 600,
  },
  tracksContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  trackContainer: {
    display: "flex",
    flexDirection: "row",
  },
  indexTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  breadcrumbLink: {
    textDecoration: "none",
  },
}));
