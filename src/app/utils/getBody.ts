import { IncomingMessage, ServerResponse } from 'node:http';

import { IUserProperties } from './types';
import { StatusCodes, ErrorMessages } from './messages';

const getBody = (req: IncomingMessage, res: ServerResponse): Promise<IUserProperties> => {
    return new Promise((resolve) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                resolve(parsedBody);
            } catch {
                res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ code: StatusCodes.badRequest, message: ErrorMessages.invalidBody }));
            }
        });
    });
}

export { getBody };
