import React from "react";
import { SocketClientContext } from "./SocketClientContext";

export const useSocketClient = () => {
  const socketClient = React.useContext(SocketClientContext);
  if (!socketClient) {
    throw new Error('useSocketClient must be used within a SocketClientProvider')
  }
  return socketClient;
}
