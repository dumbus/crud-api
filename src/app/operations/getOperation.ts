import { ServerResponse } from 'node:http';
import { StatusCodes, ErrorMessages } from '../utils/types';
import { checkUserId } from '../validators/checkUserId';
import { databaseController } from '../database/databaseController';

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

const getUser = (res: ServerResponse, userId: string) => {
    try {
        const { code, message, validationSuccess } = checkUserId(userId);

        if (validationSuccess) {
            const user = databaseController.getUser(userId);

            res.writeHead(code, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(code, { 'Content-Type': 'application/json' });
            res.end(message);
        }
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

export { getAllUsers, getUser };
