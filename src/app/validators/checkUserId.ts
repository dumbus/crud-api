import { validate as validateUuid } from 'uuid';
import * as database from '../database.json';
import { StatusCodes, ErrorMessages } from '../utils/types';

const checkUserId = (userId: string) => {
    if (!validateUuid(userId)) {
        return {
            code: StatusCodes.badRequest,
            message: ErrorMessages.invalidId,
            validationSuccess: false
        }
    }

    if (!database.find(user => user.id === userId)) {
        return {
            code: StatusCodes.notFound,
            message: ErrorMessages.notFound,
            validationSuccess: false
        }
    }

    return {
        code: StatusCodes.ok,
        message: ErrorMessages.ok,
        validationSuccess: true
    }
};

export { checkUserId };
