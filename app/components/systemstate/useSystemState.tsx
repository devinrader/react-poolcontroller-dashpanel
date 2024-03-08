import React from "react";
import { SystemStateContext } from "./SystemStateContext";

export const useSystem = () => {
  const systemState = React.useContext(SystemStateContext);
  if (!systemState) {
    throw new Error('useSystemState must be used within a SystemStateProvider')
  }
  return systemState;
}
