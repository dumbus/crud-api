const enum StatusCodes {
    ok = 200,
    created = 201,
    deleted = 204,
    badRequest = 400,
    notFound = 404,
    internalServerError = 500
}

const enum ErrorMessages {
    invalidId = 'User id is not uuid',
    invalidRequest = 'Request has wrong endpoint',
    invalidBody = 'Body of request has wrong format',
    invalidRequiredFields = 'Something is wrong with required fields',
    notFound = 'User doesn\'t exist',
    internalServerError = 'Internal server error',
}

export { StatusCodes, ErrorMessages };
