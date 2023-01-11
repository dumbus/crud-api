import { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCodes, ErrorMessages, IUser } from './types';

const getBody = (req: IncomingMessage, res: ServerResponse) => {
    return new Promise((resolve) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toSting();
        });

        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                const result = {
                    parsedBody,
                    validationSuccess: true
                }
                resolve(result);
            } catch {
                resolve({
                    code: StatusCodes.badRequest,
                    message: ErrorMessages.invalidBody,
                    validationSuccess: false
                });
            }
        });
    });
}

export { getBody };
