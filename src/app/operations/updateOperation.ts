import { IncomingMessage, ServerResponse } from 'node:http';
import { getBody } from '../utils/getBody';
import { validateBody } from '../validators/validateBody';
import { validateUserId } from '../validators/validateUserId';
import { databaseController } from '../database/databaseController';
import { StatusCodes, ErrorMessages } from '../utils/types';

const updateOperation = async (userId: string, req: IncomingMessage, res: ServerResponse) => {
    try {
        const isUserIdValid = validateUserId(userId, res);

        if (isUserIdValid) {
            const body = await getBody(req, res);

            const isBodyValid = validateBody(body, res);

            if (isBodyValid) {
                const updatedUser = databaseController.updateUser(userId, body);

                res.writeHead(StatusCodes.ok, { 'Content-Type': 'application/json' });
                res.end(updatedUser);
            }
        }
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

export { updateOperation };
