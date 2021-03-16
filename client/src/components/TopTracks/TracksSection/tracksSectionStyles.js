import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  tracksContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "1rem",
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
}));
