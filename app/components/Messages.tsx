"use client"

import React, { useEffect, useCallback } from "react";
import { MessageDetails } from "./MessageDetails";
import { useConstants } from "./constants/useConstants";
import { useDefinitions } from "./definitions/useDefinitions";
import { MessageTable } from "./MessageTable";
import { LogMessageTypeConverter } from "./LogMessageTypeConverter";
import { Message } from "../types";
import { useSocketClient } from "./socket/useSocketClient";
import { MessageChange } from "./DirectionEnum";
import { useLogMessagesDisplayStore } from "./logMessageDisplay/useLogMessagesDisplayStore";

export default function Messages() {

  const [constants] = useConstants()
  const [definitions] = useDefinitions()
  const socket = useSocketClient();
  const [store, setStore] = useLogMessagesDisplayStore()

  let converter: LogMessageTypeConverter | undefined;

  const onLogMessage = useCallback((data: Message) => {

    if (!converter) //create a new LogMessage converter when needed
      converter = new LogMessageTypeConverter(constants, definitions);

    console.log(`${data._id}: Making Log for ${data.protocol}`)
    let msg = converter.toLogMessage(data);
    var prev = store.messages.find((m) => m.messageKey == msg.messageKey);

    if (typeof prev === 'undefined') {
      msg.changed = MessageChange.new;
    } else if (converter.isMessageDiff(msg, prev)) {
      msg.changed = MessageChange.update;
    }

    //setLogMessages((prevMessages) => [msg, ...prevMessages]);
    setStore({ messages: [...store.messages, msg]})

    if (!store.pinned) {
      setStore({ selectedMessage: msg })
    }

  }, [constants, definitions, store.messages, store.pinned]);

  const onConnect = useCallback(() => {
    console.log(`socket connected`)
    socket.emit('sendLogMessages', 'true')
  }, []);

  const onDisconnect = useCallback(() => {
    console.log(`socket disconnected`)
  }, [])

  useEffect(() => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('logMessage', onLogMessage)
    // socket.on('equipment', (data) => {
    //   console.log({ evt: 'equipment', data: data })
    // })
    // socket.on('controller', (data) => {
    //   console.log({ evt: 'controller', data: data })
    // })

    return () => {
      socket.off('logMessage');
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket, constants, definitions, onConnect, onDisconnect, onLogMessage]);

  return (
    <div className="flex flex-row gap-x-2">
      <MessageTable />
      <MessageDetails  />
    </div>
  )
}
