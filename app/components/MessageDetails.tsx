import { Panel } from "primereact/panel";
import { MessagePayload } from "./MessagePayload";
import { useLogMessagesDisplayStore } from "./logMessageDisplay/useLogMessagesDisplayStore";

export const MessageDetails = () => {

  const [store, setStore] = useLogMessagesDisplayStore()

  return (
    // <Panel className="grow basis-1/3" header="Inbound Message Details">

    <div className="flex flex-col text-[10px] gap-2">

      {store.selectedMessage &&
        <>
          <div className="flex flex-row">
            <div>
              <div>Port: {store.selectedMessage.portId}</div>
              <div>Protocol: {store.selectedMessage.protocol ? store.selectedMessage.protocol.name : ''}</div>
              <div>Source/Dest: [{store.selectedMessage.sourceByte}] {store.selectedMessage.source!.name} {store.selectedMessage.direction}[{store.selectedMessage.destinationByte}] {store.selectedMessage.destination!.name}</div>
              {/* <div>Destination: </div>
                <div>Direction: </div> */}
              <div>Action: [{store.selectedMessage.actionByte!.toString()}] {store.selectedMessage.actionName}</div>
              <div>Timestamp: {store.selectedMessage.timestamp ? store.selectedMessage.timestamp.toString() : ''}</div>
              <div>Data Length: {store.selectedMessage.payloadLength}</div>
            </div>
            <div>
              <div>Padding: [{store.selectedMessage.padding!.toString()}]</div>
              <div>Header: [{store.selectedMessage.header!.toString()}]</div>
              <div>Term: [{store.selectedMessage.term!.toString()}]</div>
              <div>Resp For: [{store.selectedMessage.responseFor?.toString()}]</div>
            </div>
          </div>
          <div>
            {store.selectedMessage.payload &&
              <MessagePayload data={store.selectedMessage.payload} />
            }
          </div>
        </>
      }
    </div>

    // </Panel>
  )
}