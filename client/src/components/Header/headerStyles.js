import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0",
    padding: "0.3rem",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTextBold: {
    fontWeight: "600",
    color: theme.palette.spotifyGreen,
    alignItems: "center",
  },
  chipContainer: {
    alignSelf: "flex-end",
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatarWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

export default useStyles;
