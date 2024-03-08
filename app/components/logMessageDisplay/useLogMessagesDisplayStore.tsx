import React, { useEffect, useState, useSyncExternalStore } from "react";
import { LogMessagesContext } from "./LogMessagesDisplayContext";
import { LogMessagesDisplayStore } from "@/app/types";

export function useLogMessagesDisplayStore(): [
  LogMessagesDisplayStore,
  (value: Partial<LogMessagesDisplayStore>) => void,
] {
  const store = React.useContext(LogMessagesContext);
  if (!store) {
    throw new Error('useLogMessagesDisplayStore must be used within a LogMessagesProvider')
  }
  const state = useSyncExternalStore(store.subscribe, store.get)
  return [store.get(), store.set];
}  