"use client"

import Messages from "./components/Messages";
import { ConstantsProvider } from "./components/constants/ConstantsProvider";
import { DefinitionsProvider } from "./components/definitions/DefinitionsProvider";
import { io } from 'socket.io-client';
import { SocketClientProvider } from "./components/socket/SocketClientProvider";
import { SystemStateProvider } from "./components/systemstate/SystemStateProvider";
import { MessagesHeader } from "./components/MessagesHeader";
import { LogMessageDisplayProvider } from "./components/logMessageDisplay/LogMessagesDisplayProvider";

export default function Home() {

  const socketUrl: string = 'ws://10.0.4.10:4200/';
  const socket = io(socketUrl, { autoConnect: false });

  return (
      <DefinitionsProvider>
        <ConstantsProvider>
          <SystemStateProvider>
            <SocketClientProvider client={socket}>
              <div className="container bg-white mx-auto my-4 rounded p-2 h-full">
                <MessagesHeader />
                <LogMessageDisplayProvider>
                  <Messages />
                </LogMessageDisplayProvider>
              </div>
            </SocketClientProvider>
          </SystemStateProvider>
        </ConstantsProvider>
      </DefinitionsProvider>
  );
}
