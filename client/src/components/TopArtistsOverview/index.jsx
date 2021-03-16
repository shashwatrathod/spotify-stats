import { CircularProgress } from "@material-ui/core";
import _, { isArrayLikeObject } from "lodash";
import React, { useEffect, useContext, useState } from "react";
import { TopArtistsContext } from "../Contexts/TopArtistsContext";
import ArtistBanner from "./ArtistBanner";
import MyCarousel from "./MyCarousel";

const TopArtistOverview = () => {
  const {
    topArtistsCompact,
    setTopArtistsCompact,
    fetchTopArtists,
  } = useContext(TopArtistsContext)[0];

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(async () => {
    if (!topArtistsCompact) {
      var _topArtistsCompact = await fetchTopArtists(3, "long_term");
      _topArtistsCompact
        ? setTopArtistsCompact(_.cloneDeep(_topArtistsCompact))
        : "ignore";
    }
  }, []);

  useEffect(() => {
    topArtistsCompact ? setShouldRender(true) : setShouldRender(false);
  }, [topArtistsCompact]);

  if (shouldRender) {
    return (
      <>
        <MyCarousel>
          {topArtistsCompact.items.map((item, index) => {
            return <ArtistBanner item={item} key={index} />;
          })}
        </MyCarousel>
      </>
    );
  } else {
    return <ArtistBanner item={false} key={1} />;
  }
};

export default TopArtistOverview;
