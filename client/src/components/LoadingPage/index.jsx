import React, { useEffect, useContext, useState } from "react";
import InfinityLoading from "../../svgs/InfinityLoading.svg";
import { UserContext } from "../Contexts/UserContext";
import { AnimationImage, Container } from "./loadingPageElements";
import { Redirect, useLocation } from "react-router-dom";
import _ from "lodash";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LoadingPage = () => {
  const {
    accessToken,
    setAccessToken,
    fetchAccessTokenFromRefreshToken,
  } = useContext(UserContext)[0];
  const [redirect, setRedirect] = useState(false);
  const query = useQuery();

  useEffect(async () => {
    if (!accessToken) {
      var _accessToken = await fetchAccessTokenFromRefreshToken();
      _accessToken
        ? setAccessToken(_.cloneDeep(_accessToken))
        : setRedirect("/login");
    }
  });

  useEffect(async () => {
    if (accessToken) {
      if (query.get("redirect")) {
        setRedirect(`/${query.get("redirect")}`);
      } else {
        setRedirect("/home");
      }
    }
  }, [accessToken]);

  if (redirect) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <Container>
        <AnimationImage src={InfinityLoading} />
      </Container>
    );
  }
};

export default LoadingPage;
