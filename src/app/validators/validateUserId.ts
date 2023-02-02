import { ServerResponse } from 'node:http';
import { validate as validateUuid } from 'uuid';

import { StatusCodes, ErrorMessages } from '../utils/messages';
import { databaseController } from '../controllers/databaseController';

const validateUserId = (userId: string, res: ServerResponse) => {
    try {
        const database = databaseController.getAllUsers();
        
        if (!validateUuid(userId)) {
            res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code: StatusCodes.badRequest, message: ErrorMessages.invalidId }));
    
            return false;
        }
    
        if (!database.find(user => user.id === userId)) {
            res.writeHead(StatusCodes.notFound, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code: StatusCodes.notFound, message: ErrorMessages.notFound }));
            
            return false;
        }

        return true;
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ code: StatusCodes.internalServerError, message: ErrorMessages.internalServerError }));

        return false;
    }
};

export { validateUserId };
