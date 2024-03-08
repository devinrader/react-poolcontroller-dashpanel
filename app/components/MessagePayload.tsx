export const MessagePayload: React.FC<{ data: Array<number> }> = ({ data }) => {

  const toAscii = (byte: number):string => {
    return (byte < 127 && byte > 31) ? String.fromCharCode(byte) : '.';
  };

  let toHex = (byte:number, pad:number|null):string => {
    let hex = byte.toString(16);
    pad = typeof pad === 'undefined' || pad === null ? 2 : pad;
    while (hex.length < pad) hex = '0' + hex;
    return hex.toUpperCase();
  };

  return (
    <div className="flex flex-row flex-wrap gap-y-4">
      {data.map((byte, index) =>
        <div key={index} className="flex flex-col outline-slate-500 divide-y divide-x divide-x-reverse divide-y-reverse divide-slate-500">
          <div className="w-7 bg-slate-500 flex-none text-center">{index}</div>
          <div className="w-7 flex-none text-center">{byte}</div>
          <div className="w-7 flex-none text-center">{toAscii(byte)}</div>
          <div className="w-7 flex-none text-center">{toHex(byte,null)}</div>
        </div>
      )}
    </div>
  )
}