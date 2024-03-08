import React, { createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export const SocketClientContext = createContext<Socket|null>(null);
