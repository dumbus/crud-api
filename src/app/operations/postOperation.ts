import { IncomingMessage, ServerResponse } from 'node:http';

import { getBody } from '../utils/getBody';
import { validateBody } from '../validators/validateBody';
import { databaseController } from '../database/databaseController';
import { StatusCodes, ErrorMessages } from '../utils/types';

const postOperation = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getBody(req, res);

        const isBodyValid = validateBody(body, res);

        if (isBodyValid) {
            const newUser = databaseController.createUser(body);

            res.writeHead(StatusCodes.created, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        }
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

export { postOperation };
