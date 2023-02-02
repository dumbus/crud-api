import { ServerResponse } from 'node:http';

import { IUser } from '../utils/types';
import { StatusCodes, ErrorMessages } from '../utils/messages';

const validateBody = (body: IUser, res: ServerResponse) => {
    const { username, age, hobbies, id, ...rest } = body;

    try {
        if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
            res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code: StatusCodes.badRequest, message: ErrorMessages.invalidRequiredFields }));
            
            return false;
        }

        if (hobbies.length > 0) {
            if (hobbies.find(hobbie => typeof hobbie !== 'string')) {
                res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ code: StatusCodes.badRequest, message: ErrorMessages.invalidRequiredFields }));
                
                return false;
            }
        }

        if (Object.keys(rest).length > 0) {
            res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ code: StatusCodes.badRequest, message: ErrorMessages.invalidRequiredFields }));
            
            return false;
        }

        return true;
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ code: StatusCodes.internalServerError, message: ErrorMessages.internalServerError }));

        return false;
    }
};

export { validateBody };
