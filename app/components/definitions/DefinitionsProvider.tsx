"use client"

import { useEffect } from "react";
import { DefinitionsContext, useDefinitionsState } from "./DefinitionsContext";
import { Definition, Dictionary } from "@/app/types";

export const DefinitionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [definitions, setDefinitions] = useDefinitionsState();

  useEffect(() => {
    async function fetchData() {
      const data: Dictionary<Definition> = await (await fetch('/api/messages/definitions')).json();
      setDefinitions(data);
    }
    fetchData();
  }, [setDefinitions])

  return (
    <DefinitionsContext.Provider value={[definitions, setDefinitions]}>
      {children}
    </DefinitionsContext.Provider>
  )
}