import { IncomingMessage, ServerResponse } from 'node:http';
import { getBody } from '../utils/getBody';
import { checkBody } from '../validators/checkBody';
import { databaseController } from '../database/databaseController';
import { StatusCodes, ErrorMessages } from '../utils/types';

const postOperation = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const body = await getBody(req);

        if (body) {
            const { code, message, validationSuccess } = checkBody(body, "POST");

            if (validationSuccess) {
                const newUser = databaseController.createUser(body);

                res.writeHead(code, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
            } else {
                res.writeHead(code, { 'Content-Type': 'application/json' });
                res.end(message);
            }
        } else {
            res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.invalidBody);
        }
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

export { postOperation };
