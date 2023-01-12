import { ServerResponse } from 'node:http';

import { StatusCodes, ErrorMessages, IUserProperties } from '../utils/types';

const validateBody = (body: IUserProperties, res: ServerResponse) => {
    const { username, age, hobbies } = body;

    try {
        if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
            res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.invalidRequiredFields);
            
            return false;
        }

        if (hobbies.length > 0) {
            if (hobbies.find(hobbie => typeof hobbie !== 'string')) {
                res.writeHead(StatusCodes.badRequest, { 'Content-Type': 'application/json' });
                res.end(ErrorMessages.invalidRequiredFields);
                
                return false;
            }
        }

        return true;
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);

        return false;
    }
};

export { validateBody };
