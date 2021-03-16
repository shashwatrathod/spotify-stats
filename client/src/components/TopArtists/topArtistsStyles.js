import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  tab: {
    marginTop: "1rem",
    borderRadius: "12px",
    width: 1000,
    alignSelf: "center",
  },
  titleText: {
    margin: "1rem",
    fontWeight: 600,
  },
  breadcrumbLink: {
    textDecoration: "none",
  },
}));
