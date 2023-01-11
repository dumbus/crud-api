import { IncomingMessage, ServerResponse } from 'node:http';
import { StatusCodes, ErrorMessages, IUser } from '../utils/types';
import { checkUserId } from '../validators/checkUserId';
import * as database from '../database.json';

const getAllUsers = (res: ServerResponse) => {
    try {
        const allUsers = database;

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
            const user = database.find((user: IUser) => user.id === userId);

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

export {  };
