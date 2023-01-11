import { IncomingMessage } from 'node:http';
import { IUserProperties } from './types';

const getBody = (req: IncomingMessage): Promise<IUserProperties | null> => {
    return new Promise((resolve) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toSting();
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                resolve(parsedBody);
            } catch {
                resolve(null);
            }
        });
    });
}

export { getBody };
