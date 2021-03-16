import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  boxOne: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
  boxTwo: {},
  boxThree: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));
