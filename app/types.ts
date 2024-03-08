import { Direction, MessageChange } from "./components/DirectionEnum";

export type LogMessagesDisplayStore = {
  pinned: boolean;
  changedOnly: boolean;
  selectedMessage: any;
  messages: LogMessage[];
}

export interface SystemState {

//   systemUnits: any; /*{
//     val: number;
//     name: string;
//     desc: string;
//   }*/
//   startTime: string;
   time: string;
//   valve: number;
//   delay: any; /*{
//     val: number;
//     name: string;
//     desc: string;
//   };*/
//   batteryVoltage: number;
  status: {
    val: number;
    name: string;
    desc: string;
    percent: number;
  };
//   mode: any; /*{
//     val: number;
//     name: string;
//     desc: string;
//   };*/
//   appVersion: string;
//   appVersionState: any; /*{
//     gitLocalBranch: string;
//     gitLocalCommit: string;
//     installed: string;
//     status: {
//       val: number;
//       name: string;
//       desc: string;  
//     };
//     nextCheckTime: string;
//     githubRelease: string;
//     equipmentType: string;
//   };*/
//   clockMode: any; /*{
//     val: number;
//     name: string;
//   };*/
//   clockSource: any; /*{
//     val: number;
//     name: string;
//     desc: string;
//   }*/
//   controllerType: string;
   model: string;
//   sunrise: string;
//   sunset: string;
//   alias: string;
   freeze: boolean;
//   valveMode: any; //{};
//   temps: any; /*{
//     units: {
//       val: number;
//       name: string;
//       desc: string;  
//     };
//     bodies: any; //NumericDictionary<Body>;
//     waterSensor1: number;
//     air: number;
//     solar: number;
//     equipmentType: string;
//   };*/
//   equipment: any; /*{
//     messages: [];
//     model: string;
//     maxBodies: number;
//     maxCircuitGroups: number;
//     maxCircuits: number;
//     maxFeatures: number;
//     maxHeaters: number;
//     maxLightGroups: number;
//     maxPumps: number;
//     maxSchedules: number;
//     maxValves: number;
//     single: boolean;
//     shared: boolean;
//     dual: boolean;
//     controllerType: string;
//     equipmentType: string;
//     softwareVersion: string;
//     bootLoaderVersion: string;
//   };*/
//   pumps: any; //NumericDictionary<Pump>;
//   valves: any; //NumericDictionary<Valve>;
//   heaters: any; //NumericDictionary<Heater>;
//   chlorinators: any; //NumericDictionary<Chlorinator>;
//   circuits: any; //NumericDictionary<Circuit>;
//   features: any; //NumericDictionary<Feature>;
//   circuitGroups: any; //[];
//   lightGroups: any; //NumericDictionary<LightGroup>;
//   virtualCircuits: any; //NumericDictionary<VirtualCircuit>;
//   covers: any; //[];
//   filters: any; //NumericDictionary<Filter>;
//   schedules: any; //NumericDictionary<Schedule>;
//   chemControllers: any; //[];
//   chemDosers: any; //[];
//   delays: any; //[];
}

// export interface Pump { 
//   id: number;
//   status: {
//     val: number;
//     name: string;
//     desc: string;
//   };
//   pumpOnDelay: boolean;
//   name: string;
//   address: number;
//   type: {
//     val: number;
//     name: string;
//     desc: string;
//     maxPrimingTime: number;
//     minSpeed: number;
//     maxSpeed: number;
//     speedStepSize: number;
//     maxCircuits: number;
//     hasAddress: boolean
//   };
//   isActive: boolean;
//   command: number;
//   mode: number;
//   driveState: number;
//   watts: number;
//   rpm: number;
//   flow: number;
//   ppc: number;
//   time: number;
//   equipmentType: string;
//   minSpeed: number;
//   maxSpeed: number;
//   minFlow: number | null;
//   maxFlow: number | null;
//   speedStepSize: number;
//   flowStepSize: number;
//   circuits: NumericDictionary<Circuit>;
// }

// export interface Valve { }
// export interface Heater { }
// export interface Chlorinator { }
// export interface Circuit { }
// export interface Feature { }
// export interface LightGroup { }
// export interface VirtualCircuit { }
// export interface Filter { }
// export interface Schedule { }
// export interface Body {}

export interface Constants {
  protocols: Protocol[];
  addresses: Address[];
  controllers: {}[];
  dataTypes: {}[];
  messageTypes: {}[];
}

export interface NumericDictionary<T> {
  [index: number]: T;
}

export interface Dictionary<T> {
  [index: string]: T;
}

export interface Definition {
  minLength: number;
  shortName: string;
  keyBytes: number[];
  category: string;
  payloadKeys: Dictionary<Definition>;
}

export interface Address {
  val: number;
  name: string;
  desc?: string;
  protocol: string;
  key: string;
}

export interface Action {

}

export interface Message {
  _complete: boolean;
  _id: string;
  collisions: number;
  direction: string;
  header: Array<number>;
  isProcessed: boolean;
  isValid: boolean;
  packetCount: number;
  padding: Array<number>;
  payload: Array<number>;
  portId: number;
  preamble: Array<string>
  protocol: string;
  responseFor: Array<string>;
  rewinds: number;
  term: Array<number>;
  timestamp: Date;

  //
  //source: string;
  //dest: string;
  controllerId: number;
  //action: string;
  //payloadLength: number;
  //dir: string;
  //controllerId: number;
}


export class LogMessage {

  constructor() {
    this.changed = MessageChange.none;    
  }
  
  id: string | undefined;
  keyBytes: Dictionary<Definition> | undefined;

  keyFormat: string | undefined;
  isValid: boolean | undefined;
  portId: number | undefined;
  controllerByte: number | undefined;
  padding: number[] | undefined;
  header: number[] | undefined;
  payload: number[] | undefined;
  payloadLength: number | undefined;
  protocol: Protocol | undefined;
  source: Address | undefined;
  sourceByte: number | undefined;
  destination: Address | undefined;
  destinationByte: number | undefined;
  //  action: ctx.actionName,
  actionByte: number | undefined;
  actionName: string = '';
  timestamp: Date | undefined;
  //  dataLen: msg.payload.length,
  direction: Direction | undefined;
  messageKey: string | undefined;
  definitionKey: string | undefined;
  payloadKey: string | undefined;
  actionExt: any;
  //  direction: msg.direction === 'in' ? 'Inbound ' : 'Outbound ',
  //    header: typeof msg.header !== 'undefined' ? msg.header.join(',') : [],
  //      padding: typeof msg.padding !== 'undefined' ? msg.padding.join(',') : [],
  term: number[] | undefined;
  responseFor: string[] = [];
  category: string | undefined;
  changed: MessageChange;
}

export interface Protocol {
  name: string,
  desc: string,
  actions: Action[],
  keyFormat: string
}

// export interface IController {}
// export interface IDataType {}
// export interface IMessageType {}

// export class Constants implements IConstants {
//     protocols: IProtocol[] = [];
//     addresses: IAddress[] = [];
//     controllers: IController[] = [];
//     dataTypes: IDataType[] = [];
//     messageTypes: IMessageType[] = [];    
// }