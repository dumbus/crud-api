const enum StatusCodes {
    ok = 200,
    created = 201,
    deleted = 204,
    badRequest = 400,
    notFound = 404,
    internalServerError = 500
}

const enum ErrorMessages {
    ok = 'success',
    created = 'user was created successfully',
    deleted = 'user was deleted successfully',
    invalidId = 'user id is invalid',
    invalidRequest = 'request is invalid',
    invalidBody = 'request body is invalid',
    invalidRequiredFields = 'Something is wrong with required fields',
    notFound = 'user doesn\'t exist',
    internalServerError = 'internal server error',
}

interface IUser {
    id?: string,
    username: string,
    age: number,
    hobbies: string[];
}

export { StatusCodes, ErrorMessages, IUser };
