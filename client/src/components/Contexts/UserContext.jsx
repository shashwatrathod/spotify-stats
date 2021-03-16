import React, { useState, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [accessToken, setAccessToken] = useState(false);
  const [user, setUser] = useState(false);

  const resetUserContext = () => {
    setUser(false);
    setAccessToken(false);
  };

  const fetchAccessTokenFromRefreshToken = async () => {
    var config = {
      method: "get",
      url: "/api/auth",
      headers: {
        client_id: `${import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID}`,
      },
    };

    return axios(config)
      .then((response) => {
        if (response.status == 200 && response.data.access_token) {
          var _accessToken = response.data;
          return _accessToken;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  };

  const fetchUser = async () => {
    if (accessToken) {
      var config = {
        method: "get",
        url: "/api/user",
        headers: {
          "Content-Type": "application/json",
          access_token: `${accessToken.access_token}`,
        },
      };

      var user = await axios(config)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        })
        .catch((error) => {
          return false;
        });

      return user;
    } else {
      return false;
    }
  };

  const fetchAccessTokenFromCode = async (code) => {
    var data = JSON.stringify({
      client_id: `${import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID}`,
      code: code,
    });

    var config = {
      method: "post",
      url: "/api/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios(config)
      .then((response) => {
        if (response.status == 200 && response.data.access_token) {
          var _accessToken = response.data;
          return _accessToken;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  };

  const logoutUser = async () => {
    var data = JSON.stringify({
      client_id: `${import.meta.env.SNOWPACK_PUBLIC_CLIENT_ID}`,
    });

    var config = {
      method: "delete",
      url: "/api/auth",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios(config)
      .then((response) => {
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  };

  const value = {
    fetchAccessTokenFromRefreshToken,
    fetchAccessTokenFromCode,
    logoutUser,
    accessToken,
    setAccessToken,
    user,
    setUser,
    resetUserContext,
    fetchUser,
  };
  return (
    <UserContext.Provider value={[value]}>
      {props.children}
    </UserContext.Provider>
  );
};
