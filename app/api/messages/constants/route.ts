import { promises as fs } from 'fs';

export async function GET(request: Request, response: Response) {
    const data = await fs.readFile(process.cwd() + '/app/data/constants.json', 'utf8');
    return Response.json(JSON.parse(data.trim()))
}