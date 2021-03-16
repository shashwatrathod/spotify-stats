import React, { useContext, useEffect, useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import useStyles from "./headerStyles";
import {
  Avatar,
  Box,
  ButtonBase,
  ClickAwayListener,
  Container,
  Divider,
  Grow,
  Link,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { UserContext } from "../Contexts/UserContext";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import { TopSongsContext } from "../Contexts/TopSongsContext";
import { RecentSongsContext } from "../Contexts/RecentSongsContext";
import { UIStateContext } from "../Contexts/UIStateContext";
import _ from "lodash";
import { Link as RouterLink } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Skeleton from "@material-ui/lab/Skeleton";

const Header = () => {
  const classes = useStyles();
  const {
    logoutUser,
    accessToken,
    resetUserContext,
    fetchUser,
    user,
    setUser,
  } = useContext(UserContext)[0];
  const { resetTopArtistContext } = useContext(TopArtistsContext)[0];
  const { resetTopSongsContext } = useContext(TopSongsContext)[0];
  const { resetRecentSongsContext } = useContext(RecentSongsContext)[0];
  const { resetUIStateContext } = useContext(UIStateContext)[0];

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(async () => {
    if (accessToken && !user) {
      var _user = await fetchUser();
      _user ? setUser(_.cloneDeep(_user)) : "ignore"; //TODO send error
    }
  }, [accessToken]);

  const handleLogOut = async () => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    var wasLogOutSuccessfull = await logoutUser();

    if (wasLogOutSuccessfull) {
      resetUserContext();
      resetTopArtistContext();
      resetTopSongsContext();
      resetRecentSongsContext();
      resetUIStateContext();
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Container className={classes.container}>
          <Typography
            variant="h4"
            className={classes.titleTextBold}
            component={RouterLink}
            to="/home"
            style={{ textDecoration: "none" }}
          >
            SpotifyStats
          </Typography>
          {accessToken && user && (
            <Box className={classes.chipContainer}>
              <Toolbar title="Sign Out" aria-label="logout">
                <ButtonBase
                  ref={anchorRef}
                  aria-haspopup="true"
                  style={{ borderRadius: "15px" }}
                  onClick={handleToggle}
                >
                  <Box className={classes.avatarWrapper}>
                    {user ? (
                      <Avatar
                        src={user && user.image ? user.image.url : ""}
                        className={classes.avatar}
                      />
                    ) : (
                      <Skeleton variant="circle">
                        <Avatar />
                      </Skeleton>
                    )}

                    <ArrowDropDownIcon />
                  </Box>
                </ButtonBase>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                  zIndex={100}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper elevation={4} zIndex={100}>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <Link
                              href={user ? user.spotify_url : "#"}
                              target="_blank"
                              underline="none"
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <MenuItem onClick={handleClose}>
                                <ListItemAvatar>
                                  <Avatar src={user ? user.image.url : ""} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={user ? user.display_name : ""}
                                  secondary={<>id: {user ? user.id : ""}</>}
                                />
                              </MenuItem>
                            </Link>
                            <Divider />
                            <MenuItem onClick={handleLogOut}>
                              <ListItemIcon>
                                <ExitToAppIcon />
                              </ListItemIcon>
                              <ListItemText primary="Log Out" />
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Toolbar>
            </Box>
          )}
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
