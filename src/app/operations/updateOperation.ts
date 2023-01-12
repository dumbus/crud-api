import { IncomingMessage, ServerResponse } from 'node:http';
import { getBody } from '../utils/getBody';
import { checkBody } from '../validators/checkBody';
import { checkUserId } from '../validators/checkUserId';
import { databaseController } from '../database/databaseController';
import { StatusCodes, ErrorMessages } from '../utils/types';

const updateOperation = async (userId: string, req: IncomingMessage, res: ServerResponse) => {
    try {
        const { code, message, validationSuccess } = checkUserId(userId);

        if (validationSuccess) {
            const body = await getBody(req);

            if (body) {
                const { code, message, validationSuccess } = checkBody(body, "PUT");

                if (validationSuccess) {
                    const updatedUser = databaseController.updateUser(userId, body);

                    res.writeHead(code, { 'Content-Type': 'application/json' });
                    res.end(updatedUser);
                } else {
                    res.writeHead(code, { 'Content-Type': 'application/json' });
                    res.end(message);
                }
            } else {
                res.writeHead(code, { 'Content-Type': 'application/json' });
                res.end(message);
            }
        } else {
            res.writeHead(code, { 'Content-Type': 'application/json' });
            res.end(message);
        }
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

export { updateOperation };
