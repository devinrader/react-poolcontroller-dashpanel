import { promises as fs } from 'fs';

export async function GET(request: Request, response: Response) {
    return Response.json( await getKeyBytes() );
}

const getKeyBytes = async () => {
    let messages = await loadMessages();
    let keys:any = {};

    //look through all of the protocols in the object
    for (let proto in messages) {
        for (let key in messages[proto]) {
            let msg = messages[proto][key];

            if (typeof msg.keyBytes !== 'undefined') {
                let kb: any = { keyBytes: messages[proto][key].keyBytes, shortName: msg.shortName, hasCategories: msg.hasCategories, category: msg.category, minLength: msg.minLength };
                if (typeof msg.payloadKeys !== 'undefined') {
                    kb.payloadKeys = {};
                    for (let pkey in msg.payloadKeys) {
                        let pb = msg.payloadKeys[pkey];
                        if (typeof pb !== 'undefined') kb.payloadKeys[pkey] = { shortName: pb.shortName, category: pb.category };
                    }
                }
                keys[key] = kb;
            }
            else {
                keys[key] = { shortName: msg.shortName };
            }
        }
    }
    return keys;
}

const loadMessages = async () => {
    const data = await fs.readFile(process.cwd() + '/app/data/definitions.json', 'utf8');
    return JSON.parse(data.trim())
}