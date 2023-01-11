import { StatusCodes, ErrorMessages, IUser } from '../types';

const checkBody = (body: IUser) => {
    const { username, age, hobbies } = body;

    try {
        if (typeof username !== 'string' || typeof age !== 'number' || !Array.isArray(hobbies)) {
            return {
                code: StatusCodes.badRequest,
                message: ErrorMessages.invalidRequiredFields,
                validationSuccess: false
            }
        }

        if (hobbies.length > 0) {
            if (hobbies.find(hobbie => typeof hobbie !== 'string')) {
                return {
                    code: StatusCodes.badRequest,
                    message: ErrorMessages.invalidRequiredFields,
                    validationSuccess: false
                }
            }
        }

        return {
            validationSuccess: true
        }
    } catch {
        return {
            code: StatusCodes.internalServerError,
            message: ErrorMessages.internalServerError,
            validationSuccess: false
        }
    }
};

export { checkBody };
