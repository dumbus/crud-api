import { IncomingMessage, ServerResponse } from 'node:http';

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: 'Hello World!',
    }));
};

export { requestListener };
