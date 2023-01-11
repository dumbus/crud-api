import { StatusCodes, ErrorMessages, IUserProperties } from '../utils/types';

const checkBody = (body: IUserProperties, checkFor: "POST" | "PUT") => {
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

        const code = checkFor === "POST" ? StatusCodes.created : StatusCodes.ok;

        return {
            code,
            message: ErrorMessages.ok,
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
