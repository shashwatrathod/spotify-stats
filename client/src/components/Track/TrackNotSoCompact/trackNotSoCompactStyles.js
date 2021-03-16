import { makeStyles } from "@material-ui/core";

export const useStyles = (hasTime) =>
  makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "row",
      width: "1000px",
      height: "auto",
      height: "150px",
      margin: "0.5rem",
      borderRadius: "12px",
      contentVisibility: "auto",
    },
    containerOne: {
      display: "flex",
    },
    containerTwo: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    cover: {
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      height: 150,
      minHeight: 150,
      maxHeight: 150,
    },
    trackNameAndArtist: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: hasTime ? "30%" : "40%",
      margin: "0.2rem 0rem",
      overflow: "hidden",
      // height: "100%",
    },
    songName: {
      margin: "0rem 0rem 0.2rem 0rem",
    },
    artistName: {
      margin: "0.2rem 0rem 0rem 0rem",
    },
    trackAlbum: {
      display: "flex",
      width: hasTime ? "30%" : "40%",
      height: "100%",
      alignItems: "center",
      margin: "0.2rem 0rem",
      overflow: "hidden",
    },
    trackDuration: {
      display: "flex",
      width: hasTime ? "15%" : "20%",
      height: "100%",
      alignItems: "center",
      margin: "0.2rem 0rem",
      overflow: "hidden",
    },
    trackLastPlayed: {
      display: hasTime ? "flex" : "none",
      width: hasTime ? "25%" : "0%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "center",
      margin: "0.2rem 0rem",
      overflow: "hidden",
    },
    link: {
      padding: "0rem",
      margin: "0rem",
      textDecoration: "none",
      color: "inherit",
    },
  }));
