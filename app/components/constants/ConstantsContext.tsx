import React, { createContext, useState } from "react";
import { type Constants } from "@/app/types";

export const useConstantsState = () => useState<Constants>({
  protocols: [],
  addresses: [],
  controllers: [],
  dataTypes: [],
  messageTypes: []
});

export const ConstantsContext = createContext<ReturnType<typeof useConstantsState> | null>(null);