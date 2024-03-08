import React, { useState } from 'react';
import { useSocketClient } from './socket/useSocketClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'

export function ConnectionManager() {

  const socket = useSocketClient();

  const [isConnected, setIsConnected] = useState(socket.connected);

  function toggleConnection() {

    console.log(`Starting Socket State: ${socket.connected}`)

    if (socket.connected) {
      console.log(`Disconnecting socket`)
      socket.disconnect()
      setIsConnected(false);
      return;
    }

    console.log(`Connecting socket`)
    socket.connect();
    console.log(`continue connecting socket`)
    setIsConnected(true);
  }

  return (
    <div>
      <FontAwesomeIcon className={`cursor-pointer hover:text-orange-500 ${isConnected ? 'text-pink-500' : ''}`} icon={faListAlt} onClick={toggleConnection} />
    </div>
  );
}