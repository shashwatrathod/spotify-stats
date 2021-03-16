import React, { useContext } from "react";
import { UserContext } from "./Contexts/UserContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import LoadingPage from "./LoadingPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import RecentsPage from "./Recents";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Route path="/" component={LoadingPage} exact />
        <Route path="/" component={Header} />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/recents" component={RecentsPage} />
        <Route path="/top_tracks" component={TopTracks} />
        <Route path="/top_artists" component={TopArtists} />
      </BrowserRouter>
    </>
  );
};

export default App;
