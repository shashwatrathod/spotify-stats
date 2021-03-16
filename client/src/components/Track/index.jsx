import React, { useState, useEffect } from "react";
import { useStyles } from "./trackStyles";
import ColorThief from "colorthief";
import TrackCompact from "./TrackCompact";
import TrackNotSoCompact from "./TrackNotSoCompact";

//TODO: Preview URL

const millisToMinuteSecond = (timeInMillis) => {
  var minutes = Math.trunc(timeInMillis / 1000 / 60);
  var seconds = Math.trunc((timeInMillis / 1000) % 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const getFullDateString = (utc_str) => {
  var date = new Date(utc_str);

  return `${date.toLocaleTimeString()} ${date.getDate()}\/${
    date.getMonth() + 1
  }\/${date.getFullYear()}`;
};

//GeeksForGeeks
const timeDiff = (curr, prev) => {
  var ms_Min = 60 * 1000; // milliseconds in Minute
  var ms_Hour = ms_Min * 60; // milliseconds in Hour
  var ms_Day = ms_Hour * 24; // milliseconds in day
  var ms_Mon = ms_Day * 30; // milliseconds in Month
  var ms_Yr = ms_Day * 365; // milliseconds in Year
  var diff = curr - prev; //difference between dates.
  // If the diff is less then milliseconds in a minute
  var t = 0;
  var properWord = "";
  if (diff < ms_Min) {
    t = Math.round(diff / 1000);
    properWord = t < 2 ? "second" : "seconds";

    // If the diff is less then milliseconds in a Hour
  } else if (diff < ms_Hour) {
    t = Math.round(diff / ms_Min);
    properWord = t < 2 ? "minute" : "minutes";

    // If the diff is less then milliseconds in a day
  } else if (diff < ms_Day) {
    t = Math.round(diff / ms_Hour);
    properWord = t < 2 ? "hour" : "hours";

    // If the diff is less then milliseconds in a Month
  } else if (diff < ms_Mon) {
    t = Math.round(diff / ms_Day);
    properWord = t < 2 ? "day" : "days";

    // If the diff is less then milliseconds in a year
  } else if (diff < ms_Yr) {
    t = Math.round(diff / ms_Mon);
    properWord = t < 2 ? "month" : "months";
  } else {
    t = Math.round(diff / ms_Yr);
    properWord = t < 2 ? "year" : "years";
  }

  return `Around ${t} ${properWord} ago`;
};

const Track = (props) => {
  const classes = useStyles();

  const [color, setColor] = useState("inherit");

  useEffect(async () => {
    if (props.item) {
      if (!props.item.track.album.color) {
        var image = new Image(64, 64);

        image.onload = async function () {
          var colorThief = new ColorThief();
          var color = await colorThief.getPalette(image, 2)[0];

          // setColor(
          //   `linear-gradient(to right, rgba(${color[0]},${color[1]},${color[2]},0.6), rgba(33, 43, 54,0.6))`
          // );

          setColor(`rgba(${color[0]},${color[1]},${color[2]},0.6)`);
        };

        var imgUrl = props.item.track.album.images[2].url;
        var googleProxyURL =
          "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

        image.crossOrigin = "Anonymous";
        image.src = googleProxyURL + encodeURIComponent(imgUrl);
      } else {
        setColor(props.item.track.album.color);
      }
    }
  });

  if (props.compact) {
    return (
      <>
        <TrackCompact
          {...props}
          bg={color}
          helperMethods={{ timeDiff, millisToMinuteSecond, getFullDateString }}
        />
      </>
    );
  } else {
    return (
      <>
        <TrackNotSoCompact
          {...props}
          bg={color}
          helperMethods={{ timeDiff, millisToMinuteSecond, getFullDateString }}
        />
      </>
    );
  }
};
export default Track;
