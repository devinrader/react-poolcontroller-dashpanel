"use client"

import { useCallback, useEffect, useMemo } from "react";
import { SystemStateContext, useSystemState } from "./SystemStateContext";
import React from "react";
import { SystemState } from "@/app/types";

export const SystemStateProvider = ({ children }: { children: React.ReactNode }) => {

  const [systemState, setSystemState] = useSystemState();

  useEffect(() => {
    async function fetchData() {
      const data:SystemState = await (await fetch('http://10.0.4.10:4200/state/all')).json();
      setSystemState(data)
    }
    fetchData();
  }, [setSystemState])

  return (
    <SystemStateContext.Provider value={[systemState, setSystemState]}>
      {children}
    </SystemStateContext.Provider>
  )
}  