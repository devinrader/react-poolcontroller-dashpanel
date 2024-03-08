import React from "react";
import { DefinitionsContext } from "./DefinitionsContext";

export const useDefinitions = () => {
  const definitions = React.useContext(DefinitionsContext);
  if (!definitions) {
    throw new Error('useDefinitions must be used within a DefinitionsProvider')
  }
  return definitions;
}
