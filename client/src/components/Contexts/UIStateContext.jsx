import React, { useState, createContext } from "react";

export const UIStateContext = createContext();

export const UIStateProvider = (props) => {
  const [timeFrame, setTimeFrame] = useState(0);
  const [artistTimeFrame, setArtistTimeFrame] = useState(0);

  const resetUIStateContext = () => {
    setTimeFrame(0);
    setArtistTimeFrame(0);
  };

  const value = {
    timeFrame,
    setTimeFrame,
    artistTimeFrame,
    setArtistTimeFrame,
    resetUIStateContext,
  };

  return (
    <UIStateContext.Provider value={[value]}>
      {props.children}
    </UIStateContext.Provider>
  );
};
