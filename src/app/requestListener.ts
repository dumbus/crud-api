import { IncomingMessage, ServerResponse } from 'node:http';
import { validateEndpoints } from './validators/validateEndpoints';

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');

    const resultOfValidation = validateEndpoints(req.url, req.method);
    console.log(resultOfValidation);
    
    res.writeHead(200);
    res.end(JSON.stringify({
        data: 'Hello World!',
    }));
};

export { requestListener };
