import { StatusCodes, ErrorMessages } from '../utils/types';
import { checkUserId } from './checkUserId';

const validateEndpoints = (url: string, method: string) => {
    const urlParts = url.split('/').filter(Boolean);
    const [api, users, userId, ...rest] = urlParts;

    if (api !== 'api' || users !== 'users' || rest.length !== 0) {
        return {
            code: StatusCodes.notFound,
            message: ErrorMessages.invalidRequest,
            validationSuccess: false
        }
    }

    if (method === 'PUT' || method === 'DELETE') {
        if (userId) {
            return checkUserId(userId);
            // TODO: updateUser()
            // TODO: deleteUser()
        } else {
            return {
                code: StatusCodes.notFound,
                message: ErrorMessages.invalidRequest,
                validationSuccess: false
            }
        }
    }

    if (method === 'GET') {
        if (userId) {
            return checkUserId(userId);
            // TODO: getUserById()
        } else {
            return {
                validationSuccess: true
            }
            // TODO: getAllUsers()
        }
    }

    if (method === 'POST') {
        if (userId) {
            return {
                code: StatusCodes.badRequest,
                message: ErrorMessages.invalidRequest,
                validationSuccess: false
            }
        } else {
            return {
                validationSuccess: true
            }
            // TODO: createUser()
        }
    }

};

export { validateEndpoints };
