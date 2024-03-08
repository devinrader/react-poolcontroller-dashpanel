"use client"

import { useEffect } from "react";
import { ConstantsContext, useConstantsState } from "./ConstantsContext";
import { Constants } from "@/app/types";

export const ConstantsProvider = ({ children }: { children: React.ReactNode }) => {
  const [constants, setConstants] = useConstantsState();

  useEffect(() => {
    async function fetchData() {
      const data: Constants = await (await fetch('/api/messages/constants')).json();
      setConstants(data);
    }
    fetchData();
  }, [setConstants])

  return (
    <ConstantsContext.Provider value={[constants, setConstants]}>
      {children}
    </ConstantsContext.Provider>
  )
}  