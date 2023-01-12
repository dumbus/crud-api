import { ServerResponse } from 'node:http';
import { validate as validateUuid } from 'uuid';

import { StatusCodes, ErrorMessages } from '../utils/types';
import * as database from '../database/database.json';

const validateUserId = (userId: string, res: ServerResponse) => {
    try {
        if (!validateUuid(userId)) {
            res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.invalidId);
    
            return false;
        }
    
        if (!database.find(user => user.id === userId)) {
            res.writeHead(StatusCodes.notFound, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.notFound);
            
            return false;
        }

        return true;
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);

        return false;
    }
};

export { validateUserId };
