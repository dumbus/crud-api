import { IncomingMessage, ServerResponse } from 'node:http';

import { apiController } from './utils/apiController';
import { StatusCodes, ErrorMessages } from './utils/types';

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    try {
        const { url, method } = req;
        const [api, users, id, ...rest] = url.split('/').filter(Boolean);

        if (api === 'api' && users === 'users' && rest.length === 0) {
            switch (method) {
            case('GET'):
                if (!id) {
                    apiController.getAllUsersOperation(res);
                } else {
                    apiController.getUserOperation(id, res);
                }
                break;

            case('POST'):
                if (!id) {
                    apiController.postOperation(req, res);
                } else {
                    res.writeHead(StatusCodes.notFound, { 'Content-Type': 'application/json' });
                    res.end(ErrorMessages.invalidRequest);
                }
                break;

            case('PUT'):
                if (!id) {
                    res.writeHead(StatusCodes.notFound, { 'Content-Type': 'application/json' });
                    res.end(ErrorMessages.invalidRequest);
                } else {
                    apiController.putOperation(id, req, res);
                }
                break;

            case('DELETE'):
                if (!id) {
                    res.writeHead(StatusCodes.notFound, { 'Content-Type': 'application/json' });
                    res.end(ErrorMessages.invalidRequest);
                } else {
                    apiController.deleteOperation(id, res);
                }
                break;
            }
        } else {
            res.writeHead(StatusCodes.notFound, { 'Content-Type': 'application/json' });
            res.end(ErrorMessages.invalidRequest);
        }
    } catch {
        res.writeHead(StatusCodes.internalServerError, { 'Content-Type': 'application/json' });
        res.end(ErrorMessages.internalServerError);
    }
};

export { requestListener };
