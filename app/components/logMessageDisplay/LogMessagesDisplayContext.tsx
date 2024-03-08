import { LogMessage, LogMessagesDisplayStore } from "@/app/types";
import React, { createContext, useCallback, useRef } from "react";

export function useLogMessagesDisplayStoreData(): {
  get: () => LogMessagesDisplayStore;
  set: (value: Partial<LogMessagesDisplayStore>) => void;
  subscribe: (callback: () => void) => () => void;
} {
  const store = useRef({
    pinned: false,
    changedOnly: false,
    selectedMessage: null,
    messages: new Array<LogMessage>
  });

  const get = useCallback(() => store.current, []);

  const subscribers = useRef(new Set<() => void>);
  const set = useCallback((value: Partial<LogMessagesDisplayStore>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((callback) => callback())
  },[])
  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback)
  },[])

  return { 
    get,
    set,
    subscribe,
  }
};

export const LogMessagesContext = createContext<ReturnType<typeof useLogMessagesDisplayStoreData> | null>(null);