const enum StatusCodes {
    ok = 200,
    created = 201,
    deleted = 204,
    badRequest = 400,
    notFound = 404,
    internalServerError = 500
}

const enum ErrorMessages {
    ok = 'Success',
    created = 'User was created successfully',
    deleted = 'User was deleted successfully',
    invalidId = 'User id is invalid',
    invalidRequest = 'Request has wrong endpoint',
    invalidBody = 'Body of request has wrong format',
    invalidRequiredFields = 'Something is wrong with required fields',
    notFound = 'User doesn\'t exist',
    internalServerError = 'Internal server error',
}

interface IUser {
    id?: string,
    username: string,
    age: number,
    hobbies: string[];
}

export { StatusCodes, ErrorMessages, IUser };
