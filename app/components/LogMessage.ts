// import { Address, Definition, Dictionary, Protocol } from "../types";
// import { Direction, MessageChange } from "./DirectionEnum";

// export class LogMessage {

//   constructor() {
//     this.changed = MessageChange.none;    
//   }
  
//   id: string | undefined;
//   keyBytes: Dictionary<Definition> | undefined;

//   keyFormat: string | undefined;
//   isValid: boolean | undefined;
//   portId: number | undefined;
//   controllerByte: number | undefined;
//   padding: number[] | undefined;
//   header: number[] | undefined;
//   payload: number[] | undefined;
//   payloadLength: number | undefined;
//   protocol: Protocol | undefined;
//   source: Address | undefined;
//   sourceByte: number | undefined;
//   destination: Address | undefined;
//   destinationByte: number | undefined;
//   //  action: ctx.actionName,
//   actionByte: number | undefined;
//   actionName: string = '';
//   timestamp: Date | undefined;
//   //  dataLen: msg.payload.length,
//   direction: Direction | undefined;
//   messageKey: string | undefined;
//   definitionKey: string | undefined;
//   payloadKey: string | undefined;
//   actionExt: any;
//   //  direction: msg.direction === 'in' ? 'Inbound ' : 'Outbound ',
//   //    header: typeof msg.header !== 'undefined' ? msg.header.join(',') : [],
//   //      padding: typeof msg.padding !== 'undefined' ? msg.padding.join(',') : [],
//   term: number[] | undefined;
//   responseFor: string[] = [];
//   category: string | undefined;
//   changed: MessageChange;
// }