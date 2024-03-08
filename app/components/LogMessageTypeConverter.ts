import { Constants, Definition, Dictionary, LogMessage, Message } from "../types";
import { Direction } from "./DirectionEnum";

export abstract class TypeConverter {

}

export class LogMessageTypeConverter implements TypeConverter {

  private _constants;
  private _definitions;

  constructor(constants: Constants, definitions: Dictionary<Definition>) {
    this._constants = constants;
    this._definitions = definitions;
  }

  toLogMessage(message: Message): LogMessage {

    const msg = new LogMessage();
    msg.id = message._id;
    let proto = this._constants.protocols.find(elem => elem.name === message.protocol)
    msg.keyBytes = this._definitions;
    msg.isValid = message.isValid;
    msg.portId = message.portId;
    msg.sourceByte = this.extractSourceByte(message);
    msg.destinationByte = this.extractDestinationByte(message);
    msg.actionByte = this.extractActionByte(message);
    msg.controllerByte = this.extractControllerByte(message)
    msg.timestamp = message.timestamp;
    msg.padding = message.padding;
    msg.header = message.header;
    msg.payload = message.payload;
    msg.direction = Direction[message.direction as keyof typeof Direction];
    msg.protocol = proto;
    msg.keyFormat = proto?.keyFormat || 'XXX_<controller>_<dest>_<source>_<action>';
    msg.payloadLength = message.payload.length;
    msg.term = message.term;
    msg.responseFor = message.responseFor;
    var addrSource = this._constants.addresses.find(elem => {
      if (elem.val === msg.sourceByte) {
        if (elem.protocol.indexOf(`!${message.protocol}`) >= 0) return false;
        else if (elem.protocol.indexOf(message.protocol) >= 0) return true;
        else if (elem.protocol.indexOf(`any`) >= 0) return true;
      }
      return false;
    }) || { val: msg.sourceByte || 0, key: msg.sourceByte?.toString() || "0", name: 'unk[' + msg.sourceByte?.toString() + ']', protocol: '' };
    msg.source = addrSource;

    var addrDestination = this._constants.addresses.find(elem => {
      if (elem.val === msg.destinationByte) {
        if (elem.protocol.indexOf(`!${message.protocol}`) >= 0) return false;
        else if (elem.protocol.indexOf(message.protocol) >= 0) return true;
        else if (elem.protocol.indexOf(`any`) >= 0) return true;
      }
      return false;
    }) || { val: msg.destinationByte || 0, key: msg.destinationByte?.toString() || "0", name: 'unk[' + msg.destinationByte + ']', protocol: '' };
    msg.destination = addrDestination;

    //let definitionKey = this.makeDefinitionKey(msg);
    this.makeMessageKey(msg);
    //    var actionName = this.actionByte.toString();

    return msg;
  }

  extractByte(arr: Array<number>, ndx: number, def?: number): number {
    if (arr.length > ndx)
      return arr[ndx];

    if (def)
      return def;

    throw Error('Index out of range and no default value provided');
  }

  extractActionByte(message: Message): number {
    if (message.protocol === 'chlorinator' || message.protocol === 'aqualink') return this.extractByte(message.header, 3);
    return this.extractByte(message.header, 4);
  }

  extractControllerByte(message: Message): number {
    return message.protocol === 'chlorinator' || message.protocol === 'aqualink' ? 0 : message.protocol === 'screenlogic' ? message.controllerId : this.extractByte(message.header, 1);
  }

  extractSourceByte(message: Message): number {
    if (message.protocol === 'aqualink') {
      let val = this.extractByte(message.header, 2);
      return 0;
    }
    else if (message.protocol === 'hayward') {
      return this.extractByte(message.header, 2);
    }
    else if (message.protocol === 'screenlogic') return message.direction === 'in' ? 16 : 34
    else if (message.protocol !== 'chlorinator') return this.extractByte(message.header, 3);
    else {
      var val: number | undefined = this.extractByte(message.header, 2);
      return (val! >= 80) ? 16 : val! + 80; //if the byte value is >= 80 then set to 16 - 16 is the OCP
    }
  }

  extractDestinationByte(message: Message): number {
    if (message.protocol === 'hayward') return this.extractByte(message.header, 4);
    else if (message.protocol === 'screenlogic') return message.direction === 'in' ? 34 : 16;
    else if (message.protocol !== 'chlorinator') return this.extractByte(message.header, 2);
    var val: number | undefined = this.extractByte(message.header, 2);
    return val! >= 80 ? val : 16; //if the byte value is NOT >= 80 then set to the value, otherwise 16, the OCP?
  }

  makeMessageKey(message: LogMessage): void {

    //context = context || this.createKeyContext(msg);
    var definitionKey: string = this.makeDefinitionKey(message);  //replaces makeDocKey
    var msgKey: string | undefined = message.keyFormat;

    if (!msgKey || !message || !definitionKey) { throw Error(`msgKey, definitionKey and message cannot be null`); }

    msgKey = msgKey.replace(/\<controller\>/g, message.controllerByte!.toString());
    msgKey = msgKey.replace(/\<source\>/g, message.sourceByte!.toString());
    msgKey = msgKey.replace(/\<dest\>/g, message.destinationByte!.toString());
    msgKey = msgKey.replace(/\<action\>/g, message.actionByte!.toString());
    msgKey = msgKey.replace(/\<length\>/g, message.payloadLength!.toString());

    let key: Definition = message.keyBytes![definitionKey];
    if (typeof key !== 'undefined' && typeof key.minLength !== 'undefined') {
      if (message.payloadLength! < key.minLength) {
        console.log(`Payload greater than key - appending definitionKey`)
        definitionKey += `_${message.payloadLength}`;
        key = message.keyBytes![definitionKey];
      }
    }

    var actionName = message.actionByte!.toString();
    var actionExt = '';
    var payloadKey;
    var category = message.category!;

    // console.log(`Found Key: ${JSON.stringify(key)}`)

    if (typeof key !== 'undefined') {

      message.actionName = key.shortName || actionName;

      if (typeof key.keyBytes !== 'undefined') {
        //console.log({ key: key, context: context });
        var pkey = '';
        for (var i = 0; i < key.keyBytes.length; i++) {
          const val: number = this.extractByte(message.payload!, key.keyBytes[i], 512);
          if (i !== 0) pkey += '_';
          pkey += val.toString();
        }

        msgKey += ':' + pkey;
        let xkey = typeof key.payloadKeys !== 'undefined' ? key.payloadKeys[pkey] : undefined;
        if (typeof xkey !== 'undefined') {
          actionExt = xkey.shortName;
          category = xkey.category;
        }
        else actionExt = pkey;

        payloadKey = pkey;
        //console.log({ context: context, key: key, actionExt:actionExt });
      }
      //if (typeof key.payloadKeys !== 'undefined')
      //    actionName = key.payloadKeys[pkey] || actionName;
    }

    let result = { messageKey: msgKey, docKey: definitionKey, actionName: actionName, actionExt: actionExt, payloadKey: payloadKey, category: category };
    message.messageKey = msgKey;
    message.definitionKey = definitionKey;
    message.actionName = actionName;
    message.actionExt = actionExt;
    message.payloadKey = payloadKey;
    message.category = category;
  }

  makeDefinitionKey(message: LogMessage): string {
    //context = context || this.createKeyContext(msg);
    let key: string | undefined = message.keyFormat;

    if (!key || !message) { throw Error('not found') }

    //key = key.replace(/\<controller\>/g, context.controllerByte);
    key = key.replace(/\<controller\>/g, 'P');
    key = key.replace(/\<source\>/g, message.source!.key);
    key = key.replace(/\<dest\>/g, message.destination!.key);
    key = key.replace(/\<action\>/g, message.actionByte!.toString());
    key = key.replace(/\<length\>/g, message.payloadLength!.toString());

    var ms = key.match(/\<payload\[\d+\]\>/g);

    // Key does not contain a payload element
    if (key.indexOf('payload') !== -1) {
      console.log(ms);
      console.log(key);
    }

    if (ms && typeof ms !== 'undefined') {
      for (var i = 0; i < ms.length; i++) {
        var m = ms[i];
        let foo = m.match(/\d+/)
        if (foo) {
          var ndx = parseInt(foo.toString());
          console.log(`Making payload key ${m} ndx: ${ndx}`);
          if (!isNaN(ndx) && message!.payload!.length > ndx) key = key?.replace(new RegExp(`\<payload[${ndx}]\>`, 'g'), message.payload![ndx].toString());
        }
        else {

        }
      }
    }
    return key;
  }

  isMessageDiff = (msg1: LogMessage, msg2: LogMessage) => {
    for (var i = 0; i < Math.max(msg1.payload!.length, msg2.payload!.length); i++) {
      var msg1Byte = this.extractByte(msg1.payload!, i, -1);
      var msg2Byte = this.extractByte(msg2.payload!, i, -1)
      if (msg1Byte !== msg2Byte) {
        return true;
      }
    }
    return false;
  };
}