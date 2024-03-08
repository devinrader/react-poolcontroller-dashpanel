"use client"

import { useMemo } from "react";
import { SocketClientContext } from "./SocketClientContext";
import { Socket } from "socket.io-client";
import React from "react";

export const SocketClientProvider = ({ client, children }: { client:Socket, children: React.ReactNode }) => {

  if (!client) {
    throw new Error('the `client` prop is required')
  }

  if (!(client instanceof Socket)) {
    throw new Error('the `client` prop must take an instance of Socket')
  }

  const socket = useMemo(() => client, [client])
  
  return (
    <SocketClientContext.Provider value={client}>
      {children}
    </SocketClientContext.Provider>
  )
}  