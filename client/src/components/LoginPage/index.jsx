import React from "react";
import { authURL, getTokenFromSearch } from "../../spotify";
import { useEffect, useState, useContext } from "react";
import {
  LoginButton,
  LoginButtonContainer,
  LoginContainer,
} from "./loginPageElements";
import _ from "lodash";
import { UserContext } from "../Contexts/UserContext";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const { accessToken, setAccessToken, fetchAccessTokenFromCode } = useContext(
    UserContext
  )[0];
  const [redirect, setRedirect] = useState(false);

  useEffect(async () => {
    if (!accessToken) {
      if (window.location.search.length > 0) {
        const code = getTokenFromSearch(window.location.search);

        if (code) {
          var _accessToken = await fetchAccessTokenFromCode(code);

          _accessToken
            ? setAccessToken(_.cloneDeep(_accessToken))
            : setRedirect("/"); //Show error
        }
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      setRedirect("/home");
    }
  }, [accessToken]);

  if (redirect) {
    return <Redirect to={redirect} />;
  }
  return (
    <>
      <LoginContainer>
        <LoginButtonContainer>
          <LoginButton href={authURL}>Login with Spotify</LoginButton>
        </LoginButtonContainer>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
