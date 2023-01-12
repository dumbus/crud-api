import { ServerResponse } from 'node:http';

import { validateUserId } from '../validators/validateUserId';
import { databaseController } from '../database/databaseController';
import { StatusCodes, ErrorMessages } from '../utils/types';

const deleteOperation = (userId: string, res: ServerResponse) => {
    try {
        const isUserIdValid = validateUserId(userId, res);

        if (isUserIdValid) {
            databaseController.deleteUser(userId);
            
            res.writeHead(StatusCodes.deleted, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.deleted);
        }
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

export { deleteOperation };
