import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Redirect } from "react-router-dom";
import RecentsOverview from "../RecentsOverview";
import { Box, Container } from "@material-ui/core";
import { useStyles } from "./homePageStyles";
import TopOverview from "../TopOverview";
import TopArtistOverview from "../TopArtistsOverview";

const HomePage = () => {
  const { accessToken } = useContext(UserContext)[0];
  const [redirect, setRedirect] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (!accessToken) {
      setRedirect("/?redirect=home");
    }
  }, [accessToken]);

  if (redirect) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div>
        <Container>
          <Box className={classes.boxOne}>
            <Box className={classes.boxTwo}>
              <TopArtistOverview />
            </Box>
            <Box className={classes.boxThree}>
              <TopOverview />
              <RecentsOverview />
            </Box>
          </Box>
        </Container>
      </div>
    );
  }
};

export default HomePage;
