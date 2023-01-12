import { ServerResponse } from 'node:http';

import { validateUserId } from '../validators/validateUserId';
import { databaseController } from '../database/databaseController';
import { StatusCodes, ErrorMessages } from '../utils/types';

const getAllUsers = (res: ServerResponse) => {
    try {
        const allUsers = databaseController.getAllUsers();

        res.writeHead(StatusCodes.ok, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(allUsers));
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

const getUser = (userId: string, res: ServerResponse) => {
    try {
        const isUserIdValid = validateUserId(userId, res);

        if (isUserIdValid) {
            const user = databaseController.getUser(userId);

            res.writeHead(StatusCodes.ok, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

export { getAllUsers, getUser };
