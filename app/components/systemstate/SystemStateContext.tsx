import { SystemState } from "@/app/types";
import { createContext, useState } from "react";

const now = new Date();

export const useSystemState = () => useState<SystemState>({
  time: '',
  status: {
    val: 0,
    name: '',
    desc: '',
    percent: 0
  },
  freeze: false,
  model: '',
});

export const SystemStateContext = createContext<ReturnType<typeof useSystemState> | undefined>(undefined);