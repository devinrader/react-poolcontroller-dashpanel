import React from "react";
import { ConstantsContext } from "./ConstantsContext";

export const useConstants = () => {
  const constants = React.useContext(ConstantsContext);
  if (!constants) {
    throw new Error('useConstants must be used within a ContstantsProvider')
  }
  return constants;
}  