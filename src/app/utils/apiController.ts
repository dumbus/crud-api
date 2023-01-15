import { IncomingMessage ,ServerResponse } from 'node:http';

import { getBody } from './getBody';
import { validateBody } from '../validators/validateBody';
import { validateUserId } from '../validators/validateUserId';
import { databaseController } from '../database/databaseController';
import { StatusCodes, ErrorMessages } from './messages';

const apiController = {
    getAllUsersOperation(res: ServerResponse) {
        try {
            const allUsers = databaseController.getAllUsers();
    
            res.writeHead(StatusCodes.ok, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(allUsers));
        } catch {
            res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.internalServerError);
        }
    },

    getUserOperation(userId: string, res: ServerResponse) {
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
    },

    async postOperation(req: IncomingMessage, res: ServerResponse) {
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
    },

    async putOperation(userId: string, req: IncomingMessage, res: ServerResponse) {
        try {
            const isUserIdValid = validateUserId(userId, res);
    
            if (isUserIdValid) {
                const body = await getBody(req, res);
    
                const isBodyValid = validateBody(body, res);
    
                if (isBodyValid) {
                    const updatedUser = databaseController.updateUser(userId, body);
    
                    res.writeHead(StatusCodes.ok, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(updatedUser));
                }
            }
        } catch {
            res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.internalServerError);
        }
    },

    deleteOperation(userId: string, res: ServerResponse) {
        try {
            const isUserIdValid = validateUserId(userId, res);
    
            if (isUserIdValid) {
                databaseController.deleteUser(userId);
                
                res.writeHead(StatusCodes.deleted, { 'Content-Type': 'application/json' });
                res.end(); // no message because code 204 do not return anything
            }
        } catch {
            res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.internalServerError);
        }
    }
}

export { apiController };
