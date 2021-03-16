import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { RecentSongsProvider } from "./components/Contexts/RecentSongsContext";
import { TopArtistProvider } from "./components/Contexts/TopArtistsContext";
import { TopSongsProvider } from "./components/Contexts/TopSongsContext";
import { UIStateProvider } from "./components/Contexts/UIStateContext";
import { UserProvider } from "./components/Contexts/UserContext";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#161C24",
      paper: "#212B36",
    },
    primary: {
      lighter: "#C8FACD",
      light: "#5BE584",
      main: "#00AB55",
      dark: "#007B55",
      darker: "#005249",
    },
    info: {
      lighter: "#D0F2FF",
      light: "#74CAFF",
      main: "#1890FF",
      dark: "#0C53B7",
      darker: "#04297A",
    },
    success: {
      lighter: "#E9FCD4",
      light: "#AAF27F",
      main: "#54D62C",
      dark: "#229A16",
      darker: "#08660D",
    },
    warning: {
      lighter: "#FFF7CD",
      light: "#FFE16A",
      main: "#FFC107",
      dark: "#B78103",
      darker: "#7A4F01",
    },
    error: {
      lighter: "#FFE7D9",
      light: "#FFA48D",
      main: "#FF4842",
      dark: "#B72136",
      darker: "#7A0C2E",
    },
    spotifyGreen: "#1DB954",
    contrastThreshold: 2,
  },
});

ReactDOM.render(
  <div>
    <UIStateProvider>
      <UserProvider>
        <RecentSongsProvider>
          <TopSongsProvider>
            <TopArtistProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
              </ThemeProvider>
            </TopArtistProvider>
          </TopSongsProvider>
        </RecentSongsProvider>
      </UserProvider>
    </UIStateProvider>
  </div>,
  document.getElementById("root")
);
